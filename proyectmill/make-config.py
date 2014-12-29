from sys import argv
from datetime import datetime
import time
import json

if (len(argv) < 3):
    print "Ingrese el numero del archivo primero el menor y despues el mayor"
    exit()
config_json=[]

for x in range(int(argv[1]), int(argv[2])+1):
    project={
            "source": "dc",
            "destination": "dc"+ str(x),
            "format": "png",
            "minzoom": 1,
            "maxzoom": 13,
            "width":1281,
            "height":1453,
            "mml": {
                    "Layer": [
                      {                                        
                                  "Datasource": {
                                  "file": "/home/ruben/apps/osm-progress-visualization/dc-"+str(x)+".geojson"
                                }
                  
                      }
                    ],
                    "advanced": {},
                    "name": "dc"+ str(x)
               
                  }
        }

    config_json.append(project)

print 'saving geojson'
json.dump(config_json, open('config.json', 'w'))
