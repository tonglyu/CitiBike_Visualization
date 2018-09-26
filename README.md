# INF 554 Assignment for 5

## Project - New York Sharing Bike Trip Data Visualization
- Group Name: Y&L
- Group Member: Ziwei Yuan, Tong Lyu
- Emails: Ziweiyua@usc.edu, tonglyu@usc.edu
- We will make a New York sharing bike Trip data visualization websites, which includes basic charts (time series, bar charts, etc.) and map visualization. The website is designed to sharing bike users, investors and sharing bike companys.

## Data
- We found a dataset for citibike shared bike in New York, which contains the trip data for each bike. 
- The attributes include trip ID, duration, start Time, end Time, start station's coordinate, end station's coordinate, station name, trip route category, etc.
- The history data is from year 2013 to year 2018
- Source: https://www.citibikenyc.com/system-data

## Content

### Slide 1
- Group Name: Y&L
- Group Member: Ziwei Yuan, Tong Lyu
- Emails: Ziweiyua@usc.edu, tonglyu@usc.edu

### Slide 2 - Why chose this project
- Interesting: Bicycles are popular vehicles in our daily life, shared bicycles perfectly solves the problem of the last one mile in the city for people. It is also a healthy and eco-friendly means of transportation. 
- Useful: Company will know when and where to set up more share bikes. And bike users know where they can find a share bike. It helps to offer services and maximize the use efficiency of every bike.
- Important: It helps company/investors to make decision based on statistics data chart.

### Slide 3 - Characters of the subject
- Spatial: The data can be visualized on a map. Most similar websites offer map visualization and spatial analysis, so we will try to add this part. The distribution of bicycles affects the efficiency and convenience for people. The demand of shared bicycles varies among different regions in the city.
- Life: Sharing bike is a healthy life style in New York to avoid traffic jam.
- Business: There is a business potential to invest sharing bike company.

### Slide 4 - Who is the audience
- Investors: The frequency of the use of sharing bikes reveals if investors should invest it.
- Sharing bike companys: Charts and data helps companys to improve the efficiency and convenience of bikes.
- Bike users: The websites gives user a basic knowledge of distribution and use of sharing bikes.

### Slide 5 - Data
- We found a dataset for citibike shared bike in New York, which contains the trip data for each bike. 
- The attributes include trip ID, duration, start Time, end Time, start station's coordinate, end station's coordinate, station name, trip route category, etc.
- The history data is from year 2013 to year 2018
- Source: https://www.citibikenyc.com/system-data

### Slide 6 - Story
- Distribution of shared bikes’ stations in New York on the map
- The most popular region/district for people renting bikes
- The change of numbers of renting in different seasons / weekdays / time series
- The duration bar charts (or other plots that reflects the duration for most bike users)
- Other factors (weather condition, etc) which will affect the number of rentings.

### Slide 7 - Interactive visuals
- People can pick any station point and bike point on the map and check it’s summary chart like time series chart and bar charts
- See summary of regions
- We will develop a bar chart indicating the numbers of renting on each day during one year，people can click on the bar chart to see detailed infomatoin (statistics) on the map.

### Slide 8 - Design considerations
- Functionality: various form of visualization
- Multi-audience: offers different interface to audience for their needs

### Slide 9 - Cool components
- Secret: User Oriented Design
  - Offers two buttons to different audience (company/investor and bike users), helps them find the data visualization they     want.
  - Company/Investor: if I should invest, where to add more bikes, etc.
  - Users: where can I find a bike (distribution of bike-share station)? When I have a high propbablitiy to ride a bike?

### Slide 10 - Compare to what others have done
- Concise Content: The websites only offers useful charts and information. The content is concise and less redundancy.
- User Friendly: The websites offers guide and function list for users to explore what they want.
- User Oriented: Functions and charts will be shown based on different users (two buttons).

### Slide 11 - Technologies
- HTML5/CSS3/JavaScript: basic web application development technologies
- D3.js: used to load data and visualize data
- Bootstrap: front-end frame used to adjust lay out based on the window size
- Angular (will explore): helps to develop functions and interactive components
- React: helps to develop functions and interactive components
- MapBox/Google Maps: We will pick one map API to show map visualization

### Slide 12 - How to design and build
- Two user interface: bike users, company/investor
- In bike users interface: There is an interactive station map and bar charts (the percent of start/end destination numbers) for every station point and time series chart.
- Company interface: will classify charts based on functions list
  - Activity Analysis : By seasons/ months /week days/ hours
  - Station Analysis : Net activity by hours
  - Bike Analysis: The use of the bike in hours
- Use bootstrap for interactive framework
- Angular js and react: implement functions
- Unit test and integration test: we will do unit tests and integration test to examine the functions.

### Slide 13 - Deliverables
- Demo video
- Final report
- Presentation 
- Source code
- All will be upload to gitHub

### Slide 14 - How to work
- Github records the version of the code
- Google docs is used to record the progress and problems of the project, plus the final report.
- Weekly meeting: we will hold a weekly meeting to talk about the progress of the project.

### Slide 15 - Timeline
- Week -2: research and find data
  - We did a research on existing work 
  - There is a similar websites (https://www.visualization.bike/citibike/system)
  - We will refers to similar websites
- Week -1: make proposal and presentation
- Week 1: build framework and placeholders
- Week 2: build framework, load data and test data
- Week 3: bike users interface: basic visualization charts
- Week 4: Station Analysis visualization and unit test
- Week 5: Activity Analysis visualization and unit test
- Week 6: Add map and analysis on map
- Week 7: interactivity across components
- Week 8: Refine design and final report
- Week 9: presentation and demo video


## Set-up
- `proposal.svg`, `proposal.sozi.html`, `proposal.sozi.json` are used to generate sozi presentation
- `proposal.pdf` is a pdf version manually exported from sozi presentation
- Clone and multiple commit files on gitHub 
