osm-progress-visualization
==========================

# 1. Install

`git clone https://github.com/Rub21/osm-progress-visualization.git`

`cd osm-progress-visualization`

`npm install`

# 2. Draw Boundary

 http://geojson.io/#map=2/20.1/0.0

![screenshot from 2014-10-20 17 11 54](https://cloud.githubusercontent.com/assets/1152236/4709206/c0c68120-589d-11e4-85f9-b6def29ce57a.png)

save  DC file : https://github.com/Rub21/osm-progress-visualization/blob/master/dc.geojson and then copy the [square](https://cloud.githubusercontent.com/assets/1152236/4711354/5b4f7588-58b9-11e4-9dd5-f69aaae032a1.png) in :

http://bl.ocks.org/Rub21/raw/8f918ce7e6d84dc3db80/

`{
  "type": "FeatureCollection",
  "features": [{
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -77.12059020996094,
              38.80734300597642
            ],
            [
              -77.12059020996094,
              38.997040842877695
            ],
            [
              -76.90841674804688,
              38.997040842877695
            ],
            [
              -76.90841674804688,
              38.80734300597642
            ],
            [
              -77.12059020996094,
              38.80734300597642
            ]
          ]
        ]
      }
    }
  ]
}`


![screenshot from 2014-10-20 20 39 06](https://cloud.githubusercontent.com/assets/1152236/4711417/b463ea54-58ba-11e4-9061-28fe2a17df11.png)

# 3. Filter 

`./process-files 705 716 dc.geojson`

- min-file=705( 18-Aug-2014)
- max-file=716( 30-Aug-2014)


# 5. Tile-stitch

use : https://github.com/ericfischer/tile-stitch

`./stitch -o dc.png -- 38.80734300597642 -77.12059020996094 38.997040842877695 -76.90841674804688 13 http://a.tiles.mapbox.com/v4/openstreetmap.map-inh7ifmo/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoib3BlbnN0cmVldG1hcCIsImEiOiJhNVlHd29ZIn0.ti6wATGDWOmCnCYen-Ip7Q`

we obtain: https://github.com/Rub21/osm-progress-visualization/blob/master/dc.png

 
# 6. Project on Tilemill

Install tilemill: https://github.com/mapbox/tilemill, and create a proyect: name = ["dc"](https://cloud.githubusercontent.com/assets/1152236/4711662/657e0ef2-58be-11e4-81ff-b91e6354dd17.png)

`-77.12059020996094, 38.80734300597642, -76.90841674804688, 38.997040842877695`


![screenshot from 2014-10-20 21 03 38](https://cloud.githubusercontent.com/assets/1152236/4711649/2301848c-58be-11e4-9f7e-c7555044368d.png)

change styles in tilemill:


![screenshot from 2014-10-20 21 53 38](https://cloud.githubusercontent.com/assets/1152236/4711993/38c3d4ee-58c5-11e4-81dc-092e2877a953.png)


`#line{
line-color:#e1ce18;
  line-width:0.5;
  line-comp-op:hard-light;
}`


Remove other layer on tilemill
![screenshot from 2014-10-23 15 15 13](https://cloud.githubusercontent.com/assets/1152236/4759637/fe2012c8-5ae8-11e4-9b83-72fc25c7e5a6.png)
![screenshot from 2014-10-23 15 15 28](https://cloud.githubusercontent.com/assets/1152236/4759636/fe055a78-5ae8-11e4-9a33-345a64fded63.png)

# 7. Projectmill

Clone projectmill : https://github.com/mapbox/Projectmill, and copy [this file](https://github.com/Rub21/osm-progress-visualization/blob/master/proyectmill/make-config.py) in Projectmill directory.

and setting parameters.
 
![screenshot from 2014-10-20 21 20 40](https://cloud.githubusercontent.com/assets/1152236/4711823/59b6b6ac-58c1-11e4-9dbb-cdc37fd509ac.png)

and then in terminal , go to proyectmill directory and run:

`cd projectmill`

`python make-config.py 705 716`


You will get a file in the directory config.json ProjectMill


and then run: `./index.js --mill --render -c config.json -t /home/ruben/tilemill`

You will get all .PNG files, in MapBox/export 


*If you find same images on file:

![screenshot from 2014-10-23 15 19 17](https://cloud.githubusercontent.com/assets/1152236/4759783/44037cfc-5aea-11e4-95bd-80ec3ccf3bc5.png)

*Remove the directory "layers" in dc project*

![screenshot from 2014-10-23 15 24 15](https://cloud.githubusercontent.com/assets/1152236/4759800/659f6920-5aea-11e4-8179-d1421a6852dc.png)

and then remove all project was created by projectmill:

![screenshot from 2014-10-23 15 27 44](https://cloud.githubusercontent.com/assets/1152236/4759840/b7cbc41e-5aea-11e4-8118-448bb6c7cf36.png)



and run again, 

 `./index.js --mill --render -c config.json -t /home/ruben/tilemill`

and then you will get:

![screenshot from 2014-10-23 15 20 57](https://cloud.githubusercontent.com/assets/1152236/4759782/43ffbbf8-5aea-11e4-94b2-8bd57e3dac8c.png)



# 8. Create GIF Animation

copy and paste the background file that, we obtained in Tile-stitch, https://github.com/Rub21/osm-progress-visualization/blob/master/dc.png
 and remame as: `dc704.png`

go to : `MapBox/export `, we get 

- Procesamos los archivos .png

`mogrify -format gif *.png`

- Creamos el Gif

`gifsicle --loop --unoptimize *.gif > dc.gif`

- Ponemos un pause al final de 5 segundos


`gifsicle -b dc.gif --delay 500  "#17"`

este  comando no trabaja en sistema de 64bits, trabaja en uns sistema de 32bits.

- reduciamos a la mitad el gif.

`gifsicle dc.gif  --colors 256 --resize-fit-width 800 -O2 > dc-half.gif`


- Si en caso de que se quiere extraer otros frames  como gif. =  to explode the gif into a gif per frames

`gifsicle --colors=255 --unoptimize --explode dc.gif`




