osm-progress-visualization
==========================

Data: http://planet.osm.org/replication/day/000/000/

# Install

```sh
git clone https://github.com/Rub21/osm-progress-visualization.git
cd osm-progress-visualization
npm install
```


# Draw Boundary

1. Create a geojson rectangle using [geojson.io](http://geojson.io/#map=2/20.1/0.0)

![screenshot from 2014-10-20 17 11 54](https://cloud.githubusercontent.com/assets/1152236/4709206/c0c68120-589d-11e4-85f9-b6def29ce57a.png)

2. Copy and paste the rectangle's geojson into the the first field [here](http://bl.ocks.org/Rub21/raw/8f918ce7e6d84dc3db80/)


# Process The Files

Process the data using the following command:

```sh
./process-files 705 716 dc.gejson
```

- 705 is the starting OSM replication file (in this case, Jan 25th 2014)
- 716 is the ending OSM replication file (in this case, Aug 30th 2014)
- dc.geojson is the bounding rectangle geojson file


# Tile-stitch

`./stitch -o dc.png -- 38.80654039080489 -77.12539672851561 39.00050945751261 -76.90567016601562 13 http://a.tile.openstreetmap.org/{z}/{x}/{y}.png`
 
 or:

 `./stitch -o nyc-new.png -- 38.80654039080489 -77.12539672851561 39.00050945751261 -76.90567016601562 13 http://a.tiles.mapbox.com/v4/openstreetmap.map-inh7ifmo/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoib3BlbnN0cmVldG1hcCIsImEiOiJhNVlHd29ZIn0.ti6wATGDWOmCnCYen-Ip7Q`



# Setting on Tilemill

`38.80654039080489 -77.12539672851561 39.00050945751261 -76.90567016601562`
![screenshot from 2014-09-01 19 49 53](https://cloud.githubusercontent.com/assets/1152236/4112841/2f7bb664-323b-11e4-8b08-b42a58f80194.png)

# Create config file for Projectmill

`python make-config.py`

# Create GIF Animation

- Process the directory of png files

`mogrify -format gif *.png`

- Create the gif

`gifsicle --loop=0 --colors=255 *.gif > dc.gif`

- Add a 5 second pause to the end of the gif

- *Note:* the following command only works on 32bit systems

`gifsicle dc.gif  -d500 "#-1"`

- Resize the gif

`gifsicle dc.gif --colors=255 | gifsicle --unoptimize | gifsicle  --resize-fit-width 500 -O2 > dc-half.gif`

- Run the following to extract jpeg files from the gif for each frame

`gifsicle --colors=255 --unoptimize --explode dc.gif`
