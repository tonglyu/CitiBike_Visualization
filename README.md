# INF 554 Project

## PROJECT SUMMARY

### PROJECT INFORMATION

- Project title: Citi Bike Information Visualization
- Group name: Journey to the West
- Team names: Ziwei Yuan (ziweiyua), Tong Lyu (tonglyu), Jing Zhang (zhan749), Tianyang Li (ltianyan)

### PROJECT ARTIFACTS

- [Demonstration URL](http://www-scf.usc.edu/~ziweiyua/SharingBike)
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
ng build --prod --base-href /~ziweiyua/SharingBike/
```
- Connect with `aludra.usc.edu` SFTP using [Filezilla](https://filezilla-project.org) (Port is 22)
- Copy files under `dist` folder to the remote
- Make sure the name of the folder is `SharingBike`
- Created `src` folder under `SharingBike` and move `assets` to the `src` for the right data path
- View page on http://www-scf.usc.edu/~ziweiyua/SharingBike

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
- draw bar charts
- append labels
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
### Stations Analysis
#### Infrastructures Effect Analysis
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
- Draw line:

          var line1 = d3.line()
          .x(function (d) { return x(d.Date); })
          .y(function (d) { return y(d.orders); });

          Line_chart.append("path")
               .attr("id","line1")
                .datum(data)
                .attr("class", "line")
                .style("stroke", "lightskyblue")
                .attr("d", line1);
- Draw rectangle and line:

            context.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + height2 + ")")
                .call(xAxis2);
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

- Draw donut chart:

      var pie2013 = d3.pie()
                       .value(function (d) { return d.X2013top1; })
                       (data);
                       //... set  6 dionuts
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
