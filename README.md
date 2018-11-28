# INF 554 Project

## Project - New York Sharing Bike Trip Data Visualization
- Group Name: Journey to the West (Original Y&L)
- Group Member: Ziwei Yuan, Tong Lyu, Jing Zhang, Tianyang Li
- Emails: Ziweiyua@usc.edu, tonglyu@usc.edu, zhan749@usc.edu, ltianyan@usc.edu
- We will make a New York sharing bike Trip data visualization websites, which includes basic charts (time series, bar charts, etc.) and map visualization. The website is designed to sharing bike users, investors and sharing bike companys.

## Data
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

## Content

### Slide 1
- Group Name: Journey to the West (Original Y&L)
- Group Member: Ziwei Yuan, Tong Lyu, Jing Zhang, Tianyang Li
- Emails: Ziweiyua@usc.edu, tonglyu@usc.edu, zhan749@usc.edu, ltianyan@usc.edu

### Slide 2 - Why chose this project(10 words)
- Interesting: Bicycles are popular vehicles in our daily life, shared bicycles perfectly solves the problem of the last one mile in the city for people. It is also a healthy and eco-friendly means of transportation.
- Useful: Company will know when and where to set up more share bikes. And bike users know where they can find a share bike. It helps to offer services and maximize the use efficiency of every bike.
- Important: It helps company/investors to make decision based on statistics data chart.

### Slide 3 - Target Users
-  1. Citi bike-sharing company. If they want to expand their business in other cities or want to set more new stations, our website can help them to know more factors.
-  2. People who want to know information of bike-sharing. User can get some inforamtion from our website that help them use bike.
-  3. Competitor of citi bike-sharing. From our website, they can get some useful information and laws to help them make busniess decisions.

### Slide 4 - Motivation and Goal
- Sharing economy is popular in recent years. As one of typical sharing economy, Bike-sharing help lots of users especially citizen who lived in big cities make their trip easy and convenient. All of group members like to use sharing-bike.
- There are lots of factors may influence the site of stations, number of orders and other data. We would like to analyze different data to find potential factors. And help bike-sharing company make decisions.
- There are lots of problems for bike-sharing. For example, some stations have lots of bikes for whole day, but some stations always lack of bikes. We hope to find borrow and return laws to help usr get their bikes anytime they need.


### Slide 5 - What others have done in this topic and what we do differently

- Relevant website
    - Other websites with the same topics focuses on statistics charts and spatial analysis. We could refer to some of charts such as returning bikes and borrowing bikes (per hour) statistics bar chart.
    - They are intended to show information to data analyst
    - They don't show a story about sharing bikes

- What we do
    - We used simple statistics charts to tell a story about sharing bikes, showing the temporal and spatial variation of stations and why they varied
    - Our charts are responsive and interactive. We optimized the visual queries and user interaction by multiple methos such as pop out effect, coupling effects and apporiate color scheme.


### Slide 6 - Data
- We found a dataset for citibike shared bike in New York, which contains the trip data for each bike.
- The attributes include trip ID, duration, start Time, end Time, start station's coordinate, end station's coordinate, station name, trip route category, etc.
- The history data is from year 2013 to year 2018
- Source: https://www.citibikenyc.com/system-data

### Slide 7 - Main chart story

- Two statistocs bar charts
    - Number of borrowing bikes per hour
    - Number of retruning bikes per hour
- Select any station of 6 years on map to see the statistics
- Repsonsive
- Interactive
- coupling


### Slide 8 - Main chart design/layout


### Slide 9 - Main chart 2


### Slide 10 - Main chart 3


### Slide 11 - Station infras analysis
- Base on our story, we located nearby station on map. In the same time, we found this station is one of top10 popular  stations around NYC. By doing these, we found there are many malls amd hotels around this station. So we thought the surrodings of station is also a key factor which may influnce number of orders. Thus we got top 20 popular stations data and their nearby infrastructures data. Also, we got top 10 informix stations and their nearby infra data to make a comparison.
- Our chart can directly compare popular stations and informix stations. As we can see, those popular stations always surrounded by malls, parks, hotels, transportations, big aparment and so on. For example, station loacated at south entrance of central park is one of top 20 popular stations. There lots of users came and left central park by riding sharing-bikes. Also, the informix stations are always located in remote area which has less malls and other public infrastrutures.
### Slide 12 - Station infras analysis 2
- D3.map //sky在这里补充一下。。。。。
- Zoom and burshes can help user read long period data more easily.


### Slide 13 - Station weather analysis
- Based on our experiences, weather is a important factor that may influence orders. Because, we all don't want to ride a  bike at rainy data or snow day. So we got some data from new york open data site. Weather data includes maximum and minimum temperatures, perciption and other relevant data. Apart from weather, seasons is also a key factor that may influence orders.
- According to our chart, we found there more orders at spring, summer and autumn. And there are less orders on rainy day.
- In future, we will use more weather to find more laws between weather and users.

### Slide 14 - Station user analysis
- We think different staions have different festures. For example, staions near school and universities have more young users and staions near park have more old users. We try to find some user portraits base on their age data. Thus we got top 10 stations age data in 6 years.
- Base on our data, we didn't find laws.

### Slide 15 - Who did what
- Ziwei Yuan:
- Tong Lyu
- Tianyang Li: Gor raw data and format these data into csv, json and relevant useful files. Create d3.map with top20 popular/not popular stations data to analyze infrastructure factors. Merge pie charts, line chart and map chart into same page.
- Jing Zhang: Analyzed top 20 popular /not popular stations data and find relevent factors. Create line chartn with zoom and donut charts.
