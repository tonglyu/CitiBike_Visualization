# INF 554 Project

## PROJECT SUMMARY

### PROJECT INFORMATION

- Project title: Citi Bike Information Visualization
- Group name: Journey to the West
- Team names: Ziwei Yuan (ziweiyua), Tong Lyu (tonglyu), Jing Zhang (zhan749), Tianyang Li (ltianyan)

### PROJECT ARTIFACTS

- [Demonstration URL](http://www-scf.usc.edu/~ziweiyua/NYCSharingBike)
- [Presentation PDF](presentation/presentation.pdf) and [transcript](presentation/PRESENTATION_TRANSCRIPT.md)
- [Article](paper/Citi_Bike_Information_Visualization.pdf) and [Overleaf URL](https://www.overleaf.com/4253629449tbtchfmhvmmb)
- [YouTube video](https://www.youtube.com/watch?v=Mnu_VbX8xyk)

### PROJECT DESCRIPTION
We built a Citi Bike information visualization website. We used Angular, Bootstrap, d3, Mapbox to show various types of charts and maps. We combined with datIsets in different aspects to analyze potential factors that may influence bike-sharing orders through information visualization.

## DATA

- Citi Bike Trip Histories
  - The dataset is about trip information and is summarized for each month from 2013 to now
  - Includes Start Time and Date, End Time and Date, Start Station Name, Start Station Name, Station Lat/Long, Station ID, User Year of Birth, etc
  - We downloaded trip data of June from 2013 to 2018
  - We processed the original data and generated Station GeoJSON data of 6 years, total number of borrowed bikes per hour of each station for June of each year, total number of returned bikes per hour of each station for June of each year and user age summary.
  - Source: https://www.citibikenyc.com/system-data
- NYC Facilities
  - The New York City facilities data is offered by NYC Capital Planning Platform
  - includes various types of facilities such as core infrastructure, historical sites and parks
  - The format of the data is GeoJSON
  - We used historical sites, education and infrastructure datasets to show the surroundings of top 13 popular stations.
  - Source: https://capitalplanning.nyc.gov/map/facilities#10/40.7128/-74.0807
- Precipitation Data
  - Precipitation data is offered by Kaggle.
  - The original data records the precipitation amount of 2016 in New York by day.
  - We used the data to show relationship between orders of sharing bikes and precipitation amount in 2016.
  - Source: https://www.kaggle.com/mathijs/weather-data-in-new-york-city-2016

## PROJECT SET-UP
- Clone the project with SSH: git@github.com:INF554Fall18/project-journey-to-the-west.git
- Set up Augular CLI
```
sudo npm install -g @angular/cli
cd project-journey-to-the-west
ng new project-journey-to-the-west
cd project-journey-to-the-west
mv * ../
mv .gitignore .editorconfig .angular-cli.json ../
cd ..
git add .gitignore
ng serve --open
```
- npm node install packages
```
npm install bootstrap mapbox-gl ng-zorro-antd jquery popper.js d3 @types/d3 --save
```
- Edit .angular.json
```html
"styles": [
  "node_modules/ng-zorro-antd/ng-zorro-antd.min.css",
  "src/styles.css",
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "node_modules/mapbox-gl/dist/mapbox-gl.css"
],
"scripts": [
  "node_modules/jquery/dist/jquery.min.js",
  "node_modules/popper.js/dist/umd/popper.min.js",
  "node_modules/bootstrap/dist/js/bootstrap.min.js",
  "node_modules/d3/dist/d3.min.js",
  "node_modules/mapbox-gl/dist/mapbox-gl.js"
],
```
- Create components
```
ng generate component nav-home-view
ng generate component nav-map-view
ng generate component nav-analysis-view
ng generate component nav-about-view
...
```
- Run `ng serve —-open` to start live server and serve app
- Run `npm install` if needs to install packages after clone it

## PUBLISH

- Build Angular project
```
ng build --prod --base-href /~ziweiyua/NYCSharingBike/
```
- Connect with `aludra.usc.edu` SFTP using [Filezilla](https://filezilla-project.org) (Port is 22)
- Copy files under `dist` folder to the remote
- Make sure the name of the folder is `SharingBike`
- Created `src` folder under `SharingBike` and move `assets` to the `src` for the right data path
- View page on http://www-scf.usc.edu/~ziweiyua/NYCSharingBike

## GIT
- Incremental commits and push useful files (not including `node_modules` and `e2e files`) to Git use GitHub Desktop
- Create multiple branches for team work
- Merge branches

## DEVELOPMENT DETAILS

### Bootstrap
- Build the web page frame using Bootstrap in app.component.html and other components
- add `<div>` and grids class (.container and .row) offered by Bootstrap

### Angular Components interaction
- Add a service to pass values between sibling components
```html
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class MapService {
    ......
    public yearsSource = new BehaviorSubject<any>([]);
    changeYears(years: any) {
      this.yearsSource.next(years);
    }
    ......
}
```
- Subscribe data and make actions in Components
```html
this.mapService.yearsSource.subscribe((years) => {
YEARS.forEach((year) => {
  if (years.includes(year)) {
    this.map.setLayoutProperty('stations' + year, 'visibility', 'visible');
  } else {
    this.map.setLayoutProperty('stations' + year, 'visibility', 'none');
  }

});
```

### Stations Map
#### MapBox
- Load map (center at New York)
- Add map controls
- Add layers
```html
buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 11.15,
      center: [this.lng, this.lat]
    });

    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());

    // Add geojson data on map load
   this.map.on('load', (event) => {
   }

   this.map.addLayer({
        id: "nyc",
        type: "fill",
        source: "nyc",
        'paint': {
          'fill-color': 'aqua',
          'fill-opacity':
            ["case",
              ["boolean", ["feature-state", "pop"], false], 0.75, 0
            ]
        }
  })

  YEARS.forEach((year) => {
        this.map.addLayer({
          id: 'stations' + year,
          type: 'circle',
          source: 'stations' + year,
          layout: {
            visibility: 'none'
          },
          paint: {
            'circle-radius':
              ["case",
                ["boolean", ["feature-state", "click"], false], 4, 3
              ],
            'circle-color':
              ["case",
                ["boolean", ["feature-state", "click"], false], 'aqua', COLORS[year]
              ],
            'circle-stroke-width':
              ["case",
                ["boolean", ["feature-state", "hover"], false], 2, 0
              ],
            'circle-stroke-color': COLORS[year]
          }
    });
}
```
- Add mouse events such as `map.on("mouseenter")`, `map.on("mouseleave")` and `map.on("click")` to show tooltip or pop out effect
```html
this.map.on('click', 'stations' + year, (e) => {
     // highlight
     if (e.features.length > 0 && isStats) {
       if (hoveredId) {
         this.map.setFeatureState({ source: 'stations' + hoveredYear, id: hoveredId }, { hover: false });
       }
       if (clickedId) {
         this.map.setFeatureState({ source: 'stations' + clickedYear, id: clickedId }, { click: false });
       }
       hoveredId = null;
       hoveredYear = null;
       clickedId = e.features[0].id;
       clickedYear = year;
       this.map.setFeatureState({ source: 'stations' + clickedYear, id: clickedId }, { click: true });
       this.mapService.changeStation({ 'Year': year, 'Id': e.features[0].properties.id, 'Name': e.features[0].properties.addr });
     }
   });
```
- add overlay legend
```html
.map-overlay {
  position: absolute;
  left: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  font-family: Arial, sans-serif;
  overflow: auto;
  border-radius: 3px;
}

#legend {
  padding: 10px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  line-height: 18px;
  height: 120px;
  margin-bottom: 40px;
  width: 100px;
}
```
```html
var legend = document.getElementById("legend");
var item = document.createElement('div');
var key = document.createElement('span');
key.className = 'legend-key';
key.style.backgroundColor = COLORS[year];

var value = document.createElement('span');
value.innerHTML = year;
item.appendChild(key);
item.appendChild(value);
legend.appendChild(item);
```
- set media query
```html
@media only screen and (max-width: 575px) {
    .map-overlay {
      top:0;
      margin-left: 15px;
    }
}
```

#### Selector
- add `radio` and `dropdown selector`
- use `ngModel` and `ngModelChange` to get values and add event listener
- add tooltip
```html
<nz-radio-group [(ngModel)]="radioValue" (ngModelChange)="radioLog($event)" style="margin-bottom: 10px;">
    <label nz-radio nzValue="statistics" nz-tooltip nzPlacement="right" nzTitle="Show total number of bikes returned/borrowed per hour in June for one station.">Station Activity</label>
    <label nz-radio nzValue="variation" nz-tooltip nzPlacement="right" nzTitle="Show the average activities for all stations per hour and variation of stations' count.">Station Variation</label>
</nz-radio-group>
<nz-select id="selector" [nzMode]='Mode' style="width: 80%;" nzPlaceHolder="Select the Years" [nzMaxMultipleCount]='maxMultipleCount'
    [(ngModel)]="listOfTagOptions" (ngModelChange)="selectLog($event)">
    <nz-option *ngFor="let option of listOfOption" [nzLabel]="option.label" [nzValue]="option.value">
    </nz-option>
</nz-select>
```

#### Station Activity
- d3 select and append elements
```html
var bar_container = d3.select("#" + chart)
    .select("svg")
    .attr("width", this.width + this.margin.left + this.margin.right)
    .attr("height", this.height + this.margin.top + this.margin.bottom);

var bar = bar_container
    .select("g")
    .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
```
- `d3.csv` read and return csv data
```html
d3.csv('src/assets/statistics/per hour/' + year + '(' + chart + ').csv', function (d) {
            if (d['Stationid'] == id) {
                return {
                    0: +d['0'], 1: +d['1'], 2: +d['2'], 3: +d['3'], 4: +d['4'], 5: +d['5'],
                    6: +d['6'], 7: +d['7'], 8: +d['8'], 9: +d['9'], 10: +d['10'], 11: +d['11'],
                    12: +d['12'], 13: +d['13'], 14: +d['14'], 15: +d['15'], 16: +d['16'], 17: +d['17'],
                    18: +d['18'], 19: +d['19'], 20: +d['20'], 21: +d['21'], 22: +d['22'], 23: +d['23']
                }
            }
}).then(function (data: any) {
  ......
}
```
- set and append axes
```html
var x = d3.scaleBand()
    // @ts-ignore
    .domain(hours)
    .range([0, width])
    .paddingInner(0.05);
var y = d3.scaleLinear()
    // @ts-ignore
    .domain([0, 600])
    .range([height, 0]);

// @ts-ignore
var xAxis = d3.axisBottom()
    .scale(x);
// @ts-ignore
var yAxis = d3.axisLeft()
    .tickFormat(function (d) { return (d == 600) ? "> 600" : d; })
    .scale(y);

// append axis
bar.selectAll(".x-axis")
    .data([0])
    .enter()
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .attr("class", "x-axis")
    .call(xAxis);
bar.selectAll(".y-axis")
    .data([0])
    .enter()
    .append("g")
    .attr("class", "y-axis")
    .call(yAxis);
```
- data enter and append/update `rect`
```html
rects.transition()  //UPDATE
.duration(2000)
.attr('y', function (d, i) {
    if (data[i] > 600) {
        return y(600);
    } else {
        return y(data[i]);
    }
})
.attr('width', x.bandwidth)
// @ts-ignore
.attr('height', function (d, i) {
    if (data[i] > 600) {
        return height - y(600);
    } else {
        return height - y(data[i]);
    }
});

// append rect
rects.enter()
  .append('rect')
  .attr('x', function (d, i) { return x(i); })
  .attr('y', function (d, i) {
      if (data[i] > 600) {
          return y(600);
      } else {
          return y(data[i]);
      }
  })
  .attr('width', x.bandwidth)
  // @ts-ignore
  .attr('height', function (d, i) {
      if (data[i] > 600) {
          return height - y(600);
      } else {
          return height - y(data[i]);
      }
  })
  .attr('class', function (d, i) { return "rect rect" + i; })
  .attr('fill', "darkgreen")
  .attr('opacity', '0.6')
  .attr('stroke-width', 1)
  .attr('stroke', "aliceblue")
```
- append labels
- add mouse events
```html
.on("mouseover", function (d, i) {
    d3.selectAll(".rect" + i)
        .transition()
        .duration(250)
        .style('fill', 'aqua')
        .attr('opacity', '1');

    // show text
    d3.selectAll(".label" + i)
        .transition()
        .duration(250)
        .style("font-size", 15);
})
.on("mouseout", function (d, i) {
    d3.selectAll(".rect" + i)
        .transition()
        .duration(250)
        .style('fill', 'darkgreen')
        .attr('opacity', '0.6');

    // hide text
    d3.selectAll(".label" + i)
        .transition()
        .duration(250)
        .style("font-size", 0);
});
```
- redraw charts based on the size of window
```html
var resize = function () {
  width = parseInt(d3.select("#borrow").style("width")) - margin.left - margin.right;
  if (width < 300) {
      width = 300;
  }
  bar_container.attr("width", width + margin.left + margin.right);

  x.range([0, width]);
  xAxis.scale(x);

  bar.select("#x-label")
      .attr("x", width / 2.5)

  bar.select(".x-axis").call(xAxis);

  // resize rect

  bar.selectAll(".rect")
      .attr('x', function (d, i) { return x(hours[i]); })

  bar.selectAll(".label")
      .attr('x', function (d, i) { return x(hours[i]) + x.bandwidth() / 2; })

};

window.addEventListener("resize", resize);
```
#### Station Variation      
- Draw Multi-line chart:    
  - Draw lines and circles:  
   
        lines.append("path")
          .attr("class", "line")
          .attr("d", function (d) { return line(d['Values']);})
          .attr("fill", "none")
          .attr("stroke-width", lineStroke)
          .attr("stroke", function (d, i: any) { return COLORS[d["Year"]];})
      
  - Draw focus on layer to show mouse-hover effect:

        var focus = svg.append('g')
          .attr('class', 'focus')
          .style('display', 'none');

        focus.append('line')
          .attr('class', 'x-hover-line hover-line')
          .attr('y1', 0)
          .attr('y2', height);

        svg.append('rect')
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
          .attr("class", "overlay")
          .attr("width", width)
          .attr("height", height)
          .on("mouseover", mouseover)
          .on("mouseout", mouseout)
          .on("mousemove", mousemove);
  - Add mouse events:

        function mousemove() {
          var i = d3.bisect(timeScales, d3.mouse(this)[0], 1);
          var di = data[i + 1];
          focus.attr("transform", "translate(" + x(di.Time) + ",0)");
          d3.selectAll('.points text')
              .attr('x', function (d) { return x(di.Time) + 5; })
              .attr('y', function (d: any) { return y(d.Values[i + 1].Use); })
              .text(function (d: any) { return Math.round(d.Values[i + 1].Use); })
              .style('fill', function (d: any) { return "black"; });
        }

- Calculate Variation

      var year_max = d3.max(select_years)
      var year_min = d3.min(select_years)

      var val_max, val_min;
      data.forEach((d: any) => {
          if (d['Year'] == year_max) {
              val_max = d['Count'];
          }
          if (d['Year'] == year_min) {
              val_min = d['Count'];
          }
      })

      var diff = (val_max - val_min)

- Draw Variation Table and Bar chart
  - Draw Table
  
        table.selectAll('tr')
          .data(data_table)
          .enter().append('tr')
          .style('font-weight', function (d, i) {
              return (i == 0) ? 'bold' : 'normal';
          })
          .selectAll('td')
          .data(function (d) {
              return Object.values(d);
          }).enter().append('td')
          .text(function (d) {
              return d;
          });
  - Draw bars

        rects.enter()
          .append('rect')
          .attr('x', function (d: any) { return x(d.Block); })
          .attr('y', function (d: any) { return y(d.Count); })
          .attr('width', x.bandwidth)
          // @ts-ignore
          .attr('height', function (d) { return height - y(d.Count); })
          .attr('class', function (d, i) { return "rect rect" + i; })
          .attr('fill', "darkgreen")
          .attr('opacity', '0.6')
          .attr('stroke-width', 1)
          .attr('stroke', "aliceblue")
  - Add on mouse event to show neighborhoods on map

        .on("mouseover", function (d: any, i) {
          d3.selectAll(".rect" + i)
            .transition()
            .duration(250)
            .style('fill', 'aqua')
            .attr('opacity', '1');

          // show text
          d3.selectAll(".label" + i)
              .transition()
              .duration(250)
              .style("font-size", 10);

          mapService.showNeighbor(d.Id);
        })
### Stations Analysis
#### Infrastructures Effect Analysis
- Use d3.geoConicConformal() to draw the nyc map
```html
<script>
var projection = d3.geoConicConformal()
          .parallels([33, 45])
          .rotate([96, -39])
          .fitSize([width, height], nyc);
//.fitSize([1100,600],json);

                                    //fit svg size!
svg.append("g")
        .selectAll("path")
        .data(nyc.features)
        .enter().append("path")
        .attr("d", path)
        .attr("stroke-width", 0.3)
        .attr("stroke-opacity", 0.5)
        .attr("stroke", "black")
        //.attr("fill","#ffd460")
        .attr('fill', '#ddd')
        .attr("stroke-dasharray", 1)

        .on("mouseover", function (d: any) {
          console.log(d);
          d3.select(this)
            .style("stroke-width", 1.7)
            .style("stroke-dasharray", 0)
            .attr("stroke-opacity", 1)
            .attr("stroke", "orange")

          d3.select("#neighborhoodPopover")
            .transition()
            .style("opacity", 0.7)
            .style("left", (d3.event.pageX + 70) + "px")
            //.style("top", (d3.event.pageY) + "px")
            .style("top", (d3.event.pageY + 70) + "px")
            .style("font-size", "16px")
            .style("border-radius", "20px")
            .style("border", "0px")
            .style("padding", "10px")
            .text(d.properties.neighborhood)

        })
        .on("mouseout", function (d) {
          d3.select(this)
            .attr("stroke", "black")
            .style("stroke-width", 0.3)
            .style("stroke-dasharray", 1)
            .attr("stroke-opacity", 0.5)
            //.style("stroke-width", 0.5)

          d3.select("#cneighborhoodPopoverountyText")
            .transition()
            .style("opacity", 0);
        });
  <script>
```
- Use same projection to draw the station points.

```html
            <script>
                svg.select("g")
          .attr("id", "point")
          .attr("class", "bubble")
          .selectAll("circle")
          .data(light.features)
          // .sort(function(a, b) { return b.properties.population - a.properties.population; }))
          .enter().append("circle")
          .attr("cx", function (d: any) {
            // console.log(laProjection(d.geometry.coordinates))
            return projection2(d.geometry.coordinates)[0];
          })
          .attr("cy", function (d: any) {
            // console.log(laProjection(d.geometry.coordinates))
            return projection2(d.geometry.coordinates)[1];
          })
          .attr("r", "2")
          .attr("fill", "brown")
          .attr("fill-opacity", "0.8")
          .attr("stroke", "white")
          .attr("stroke-opacity", 0)
          .attr("stroke-width", 2)
          .on("mouseover", function (d: any) {
            
            var Y = (projection2(d.geometry.coordinates)[1] - 110);
            
            d3.select(this)
            
              .attr("r", "12")
              .attr("fill-opacity", "0.2")

            </script>
```
        .
        .
        .
- Use same projection to draw the icons around the station points.
```html
<script>
svg.select("g")
                .append("g")
                .attr("id", "tem")
                .selectAll("image")
                .data(tz.features)
                .enter().append("svg:image")
                .attr("xlink:href", function (d: any) {
                  console.log(d.properties.type);
                  if (d.properties.type == "0") {
                    return "src/assets/sky/subway.svg";
                  }
                  else if (d.properties.type == "1") {
                    return "src/assets/sky/hotel.svg";
                  }
                  else if (d.properties.type == "2") {
                    return "src/assets/sky/mall.svg";
                  }
                  else if (d.properties.type == "6") {
                    return "src/assets/sky/camera.svg";
                  }
                  else if (d.properties.type == "4") {
                    return "src/assets/sky/park.svg";
                  }
                  else if (d.properties.type == "5") {
                    return "src/assets/sky/sports.svg";
                  }
                  else if (d.properties.type == "7") {
                    return "src/assets/sky/gov.svg";
                  }
                //  else {
                //    return "src/assets/sky/hotel.svg";
                //  }

                })
                .attr("x", function (d: any) {
                  return projection2(d.geometry.coordinates)[0];
                })
                .attr("y", function (d: any) {
                  return projection2(d.geometry.coordinates)[1];
                })
                .attr("width", "2")
                .attr("height", "2")
                .style("pointer-events","none");



    </script>
```  

- Wrote functions to implement the zoom interaction.
```html
<script>
 var zoom = d3.zoom()
        .scaleExtent([1, 36])
        .on("zoom", zoomed);

      //const svgOverlay: Selection<SVGRectElement, SVGDatum, HTMLElement, any> = 
      //svg.call(zoom);

      function zoomed() {
        g.attr('transform', `translate(${d3.event.transform.x},  	 ${d3.event.transform.y}) scale(${d3.event.transform.k})`);
        c.attr('transform', `translate(${d3.event.transform.x},  	 ${d3.event.transform.y}) scale(${d3.event.transform.k})`);
      };


      function transitioncenter(d) {
        var x, y, k;

        if (d && centered !== d) {
          var projection = d3.geoConicConformal()
            .parallels([33, 45])
            .rotate([96, -39])
            .fitSize([width, height], nyc);
          var centroid = path.centroid(d);
          //console.log("look" + centroid + "*******")
          //console.log("kool" + projection(d.geometry.coordinates)[0] + "," + projection(d.geometry.coordinates)[1] + "*******")
          x = centroid[0];
          y = centroid[1];
          k = 8;
          centered = d;
        } else {
          x = width / 2;
          y = height / 2;
          k = 1;
          centered = null;
        }

        //g.selectAll("path")
        //.classed("active", centered && function(d) { return d === centered; });

        g.transition()
          .duration(1000)
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + (-x-5) + "," + (-y-5) + ")")
          .style("stroke-width", 1.5 / k + "px");



      }
      
      function transition(zoomLevel) {
        svg.transition()
          .delay(100)
          .duration(1000)
          .call(zoom.scaleBy, zoomLevel);
        //.call(zoom.transform, transform);
        //.on("end", function() { canvas.call(transition); });
      }

      d3.selectAll('button').on('click', function (this: any) {
        if (this.id === 'zoom_in') {
          transition(1.5); // increase on 0.2 each time
        }
        if (this.id === 'zoom_out') {
          transition(0.6); // deacrease on 0.2 each time
        }
        if (this.id === 'zoom_init') {
          svg.transition()
            .delay(100)
            .duration(1000)
            .call(zoom.scaleTo, 1); // return to initial state
        }
</script>
```
        .
        .
        .
#### Weather Effect Analysis
- data: nyc weather data of 2016 & citi bike-sharing order data of 2016
- data process: precipitation = precipitation * 40000
- import data:

         d3.csv("weatherdata.csv").then(function (data) {
- zoom in/out method
     - Method 1: Brushed

             function brushed() {
             if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
             var s = d3.event.selection || x2.range();
             x.domain(s.map(x2.invert, x2));
             Line_chart.select("#line1").attr("d", line1);
             Line_chart.select("#line3").attr("d", line3);
             focus.select(".axis--x").call(xAxis);
             svg.select(".zoom").call(zoom.transform, d3.zoomIdentity
                 .scale(width / (s[1] - s[0]))
                 .translate(-s[0], 0));
           }
     - Method 1: Zoomed

                 function zoomed() {
             if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush") return; // ignore zoom-by-brush
             var t = d3.event.transform;
             x.domain(t.rescaleX(x2).domain());
             Line_chart.selectAll("#line1").attr("d", line1);
             Line_chart.selectAll("#line3").attr("d", line3);

             focus.select(".axis--x").call(xAxis);
             context.select(".brush").call(brush.move, x.range().map(t.invertX, t));
             }
- Draw the lines:

          var line1 = d3.line()
          .x(function (d) { return x(d.Date); })
          .y(function (d) { return y(d.orders); });

          Line_chart.append("path")
               .attr("id","line1")
                .datum(data)
                .attr("class", "line")
                .style("stroke", "lightskyblue")
                .attr("d", line1);

- Draw the rectangle and the brush:

            
            context.append("g")
                .attr("class", "brush")
                .call(brush)
                .call(brush.move, x.range());
            svg.append("rect")
                .attr("class", "zoom")
                .attr("width", width)
                .attr("height", height)
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                .call(zoom);

- Use d3.scaleTime() and d3.scaleLinear to draw the axes

var x = d3.scaleTime().range([0, width]),
        x2 = d3.scaleTime().range([0, width]),
        y = d3.scaleLinear().range([height, 0]),
        y2 = d3.scaleLinear().range([height2, 0]);

    x.domain(d3.extent(data, function (d:any) { return d.Date; }));
    y.domain([0, d3.max(data, function (d:any) { return d.orders; })]);
    x2.domain(x.domain());
    y2.domain(y.domain());


    var xAxis = d3.axisBottom(x),
        xAxis2 = d3.axisBottom(x2),
        yAxis = d3.axisLeft(y);


- Set a clip path to guarantee the lines zooming correctly.

  svg.append("defs").append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:rect")
        .attr("width", width)
        .attr("height", height)
        .attr("x", 0)
        .attr("y", 0);

    var Line_chart = svg.append("g")
        .attr("clip-path", "url(#clip)")
        .attr("class", "focus")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        ;

        .
        .
        .

- Draw the axes.


        focus.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + height + ")")
              //  .attr("fill","black")
                .call(xAxis);

        focus.append("g")
                .attr("class", "axis axis--y")
                .call(yAxis)
               // .attr("transform", "translate(" + 40 + ",0)")

        .
        .
        .




#### Age Effect Analysis
- data: age group data of top 6 popular stations
- data process: Counted number of each age group
- import data:

           d3.json("pie_data_all.json").then(function (data) {}

- Set data:

      var pie2013 = d3.pie()
                .value(function (d) { return d.X2013top1; })
                (data);
- Set donut parameters:

      var outerRadius = w / 2;
      var innerRadius = w / 3;

- Set transitions:

                 d3.select("#top-1")
                .on("click", function () {
                    path2013 = svg2013.selectAll("g.arc")
                        .select("path")
                        .data(pie2013);
                    path2013.transition()
                        .duration(1000)
                        .attrTween("d", arcTween);
                })
                //  .. set 6 transitions

- Use d3.scaleOrdinal() to set the color scale.

var color = d3.scaleOrdinal()
          .domain(["20-29", "30-39", "40-49", "50+"])
          .range(["#00345b", "#f89921", "#8b1918", "#40817b"]);

- Use d3.pie() to draw the charts.


            
            var pie2013 = d3.pie()
          .value(function (d:any) { return d.X2013top1; })
          (data);
           

        .
        .
        .
- Usce d3.arc to draw the arcs in the chart.

        var arc = d3.arc<PieArcDatum<pies>>()
          .innerRadius(innerRadius)
          .outerRadius(outerRadius);

      var arcs2013 = svg2013.selectAll("g.arc")
          .data(pie2013)
          .enter()
          .append("g")
          .attr("class", "arc")
          .attr("opacity","0.7")
          .attr("transform", "translate(" + outerRadius + ", " + outerRadius + ")");
      arcs2013.append("path")
      //@ts-ignore
          .attr("fill", function (d, i) { return color(i); })
          //@ts-ignore
          .attr("d", arc)
          .each(function (d:any) { this._current = d; });


- Wrote functions to make the chart intereactive.

        function arcTween(a) {
    var outerRadius = 200 / 2;
      var innerRadius = 200 / 3;

      var arc = d3.arc<PieArcDatum<pies>>()
          .innerRadius(innerRadius)
          .outerRadius(outerRadius);
      var i = d3.interpolate(this._current, a);
      this._current = i(0);
      //@ts-ignore
      return function (t) { return arc(i(t)) };
  }
