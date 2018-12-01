# INF 554 Project

## PROJECT SUMMARY

### PROJECT INFORMATION

- Project title: Citi Bike Information Visualization
- Group name: Journey to the West
- Team names: Ziwei Yuan (ziweiyua), Tong Lyu (tonglyu), Jing Zhang (zhan749), Tianyang Li (ltianyan)

### PROJECT ARTIFACTS

- [Demonstration URL](http://www-scf.usc.edu/~ziweiyua/SharingBike)
- [Presentation PDF](presentation/presentation.pdf) and [transcript](PRESENTATION_TRANSCRIPT.md)
- [Article](Citi Bike information Visualization.pdf) and [Overleaf URL](https://www.overleaf.com/4253629449tbtchfmhvmmb)
- [YouTube video](<youtube-video-url>)

### PROJECT DESCRIPTION
We built a Citi Bike information visualization website. We used Angular, Bootstrap, d3, Mapbox to show various types of charts and maps. We combined with datasets in different aspects to analyze potential factors that may influence bike-sharing orders through information visualization.

## DATA

- Citi Bike Trip Histories
    - The dataset is about trip information for each bike from 2013 to 2018
    - The attributes include trip ID, duration, start Time, end Time, start station's coordinate, end station's coordinate, station name, trip route category, etc
    - Source: https://www.citibikenyc.com/system-data
- NYC Facilities
    - GeoJson datasets of New York facilities
    - Includes historical sites, education, infrastructure, etc
    - Source: https://capitalplanning.nyc.gov/map/facilities#10/40.7128/-74.0807
- Weather dataset
    - New York precipitation data of 2016
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
