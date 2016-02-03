var fs = require('fs');
var osmium = require('osmium');
var turf = require('turf');
var argv = require('optimist').argv;
var users = require('./users.js');
var osmfile = argv.osmfile;
var boundfile = argv.boundfile;
var nodes = {};
var bounds;
var geojson = turf.featurecollection([]);
fs.readFile(boundfile, 'utf8', function(err, data) {
	if (err) {
		console.log('Error: ' + err);
		return;
	}
	bounds = JSON.parse(data);
	var reader = new osmium.Reader(osmfile);
	var handler = new osmium.Handler();
	console.log('Process file : ' + osmfile);
	handler.on('node', function(node) {
		var coord = [node.lon, node.lat];
		if (pointinpolygon(coord, bounds.features[0].geometry.coordinates[0])) {
			nodes[node.id] = coord;
		}
	});
	handler.on('way', function(way) {
		if (users[way.user] && way.tags("building")) {
			var feature = turf.linestring([]);
			feature.properties.user = way.user;
			feature.properties.timestamp = way.timestamp_seconds_since_epoch;
			for (var i = 0; i < way.node_refs().length; i++) {
				if (nodes.hasOwnProperty(way.node_refs()[i])) {
					feature.geometry.coordinates.push(nodes[way.node_refs()[i]]);
				}
			}
			if (feature.geometry.coordinates.length > 0) {
				geojson.features.push(feature);
			}
		}

	});
	osmium.apply(reader, handler);
	var outputFilename = 'output/' + boundfile.split('/')[1].split('.')[0] + '-' + osmfile.split('/')[1].split('.')[0] + '.geojson';
	fs.writeFile(outputFilename, JSON.stringify(geojson), function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log("JSON saved to " + outputFilename);
		}
	});
});

function pointinpolygon(point, vs) {
	var x = point[0],
		y = point[1];
	var inside = false;
	for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
		var xi = vs[i][0],
			yi = vs[i][1];
		var xj = vs[j][0],
			yj = vs[j][1];
		var intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
		if (intersect) inside = !inside;
	}
	return inside;
}