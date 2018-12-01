# INF 554 Project

## PROJECT SUMMARY

### PROJECT INFORMATION

- Project title: Citi Bike Information Visualization
- Group name: Journey to the West
- Team names: Ziwei Yuan (ziweiyua), Tong Lyu (tonglyu), Jing Zhang (zhan749), Tianyang Li (ltianyan)

### PROJECT ARTIFACTS

- [Demonstration URL](http://www-scf.usc.edu/~ziweiyua/SharingBike)
- [Presentation PDF](presentation/presentation.pdf) and [transcript](PRESENTATION_TRANSCRIPT.md)
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
- add <div> and grids class (.container and .row) offered by Bootstrap

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

### Stations Map


#### Station Activity
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
