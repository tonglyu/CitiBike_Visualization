import { Component, OnInit, Renderer2 } from '@angular/core';
import {YEARS} from '../constants';
import { MapService } from "../map.service";
import * as d3 from 'd3';

@Component({
  selector: 'app-select-attr',
  templateUrl: './select-attr.component.html',
  styleUrls: ['./select-attr.component.css']
})

export class SelectAttrComponent implements OnInit {

  constructor(private mapService: MapService, private renderer:Renderer2) { }
  //Radio value: 'variation' / 'statistics'
  radioValue = 'statistics';

  //Dropdown
  maxMultipleCount = '1';
  listOfOption = [];
  listOfTagOptions = []; // selected tags
  chartsArea: any;
  barH6 = document.getElementById("barH6");
  lineH6 = document.getElementById("lineH6");
  barChart = document.getElementById("bar");
  lineChart = document.getElementById("line");
  margin = {top: 20, right: 0, bottom: 50, left: 30};
  height = 200 - this.margin.top - this.margin.bottom;
  width: any;
  listOfStations: any;
  selectedStations = "";
  select_container: any;
  select_div: any;


  ngOnInit(): void {
    const children = [];
    YEARS.forEach(year => {
      children.push({ label: year, value: year});
    })
    this.listOfOption = children;
    this.showStats();
    this.select_container = document.getElementById("selectStations");
    this.select_div = document.getElementById("select");
    
    YEARS.forEach((year) => {
        const stations = [];
        const id = []
      this.mapService.getStations(year).subscribe(data => {
            data['features'].forEach((element) => {
                if (!id.includes(element['properties']['id'])) {
                    id.push(element['properties']['id']);
                    stations.push({ id: element['properties']['id'], name: element['properties']['addr']});
                }
            });
      });
      this.listOfStations = stations;
    });
  }

  drawBarChart(year: string, id: string): void {
    var bar_container = d3.select("#bar")
        .selectAll("svg")
        .data([0])
        .enter()
        .append("svg")
        .attr("width", this.width + this.margin.left + this.margin.right)
        .attr("height", this.height + this.margin.top + this.margin.bottom);

    var bar = bar_container
        .selectAll("g")
        .data([0])
        .enter()
        .append("g")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    var width = this.width;
    var height = this.height;
    var margin = this.margin;
    d3.csv('src/assets/statistics/per hour/' + year + '(In).csv', function (d) {
            if (d['Stationid'] == id) {
                return {0: +d['0'], 1: +d['1'], 2: +d['2'], 3: +d['3'], 4: +d['4'], 5: +d['5'],
                        6: +d['6'], 7: +d['7'], 8: +d['8'], 9: +d['9'], 10: +d['10'], 11: +d['11'],
                        12: +d['12'], 13: +d['13'], 14: +d['14'], 15: +d['15'], 16: +d['16'], 17: +d['17'],
                        18: +d['18'], 19: +d['19'], 20: +d['20'], 21: +d['21'], 22: +d['22'], 23: +d['23']
                }
            }
    }).then(function (data: any) {
        if (data.length == 0) {
            return;
        }
        
        data = data[0];
        //data = [data[0]['0'], data[0]['1'], data[0]['2'], data[0]['3'], data[0]['4'], data[0]['5']]
        var max = d3.max(Object.values(data));

        // set axis
        var hours = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];

        var x = d3.scaleBand()
                // @ts-ignore
                .domain(hours)
                .range([0, width])
                .paddingInner(0.05);
        var y = d3.scaleLinear()
                // @ts-ignore
                .domain([0, max])
                .range([height, 0]);

        // @ts-ignore
        var xAxis = d3.axisBottom()
                .scale(x);
        // @ts-ignore
        var yAxis = d3.axisLeft()
                .scale(y);
        
        var rects = bar.selectAll('rect')
                    .data(hours)
                              
        rects.transition()  //UPDATE
            .duration(2000)
            .attr('y', function(d, i) { return height - y(data[i]); })
            .attr('width', x.bandwidth)
             // @ts-ignore
            .attr('height', function(d, i) { return y(data[i]); });
            
        // append rect
        rects.enter()
            .append('rect')
            .attr('x', function(d, i) { return x(i); })
            .attr('y', function(d, i) { return height - y(data[i]); })
            .attr('width', x.bandwidth)
             // @ts-ignore
            .attr('height', function(d, i) { return y(data[i]); })
            .attr('class', "rect")
            .attr('fill', "darkorange");

        // append axis
        bar.append("g")
            .attr("transform", "translate(0," + height + ")")
            .attr("class", "x-axis")
            .call(xAxis);
        bar.append("g")
            .call(yAxis);

        bar.append("text")
            .attr("x", width/2.5)
            .attr("y", height + 35)
            .attr("font-weight", "bold")
            .attr("id", "x-label")
            .text("Hour");
        bar.append("text")
            .attr("x", -10)
            .attr("y", -5)
            .attr("font-weight", "bold")
            .text("Return");

        var resize = function() {
            width = parseInt(d3.select("#bar").style("width")) - margin.left - margin.right;
            if (width < 300) {
                width = 300;
            }
            bar_container.attr("width", width + margin.left + margin.right);

            x.range([0, width]);
            xAxis.scale(x);

            bar.select("#x-label")
                .attr("x", width/2.5)

            bar.select(".x-axis").call(xAxis);

            // resize rect

            bar.selectAll(".rect")
                .attr('x', function(d, i) { return x(hours[i]); })

        };

        window.addEventListener("resize", resize);

    });
  }

  showStats(): void {
    if (this.selectedStations == "" || this.listOfTagOptions.length == 0) {
        return;
    }
    // @ts-ignore
    barH6.innerHTML = "Bar Chart";
    // @ts-ignore
    lineH6.innerHTML = "Line Chart";
    this.width = parseInt(d3.select("#bar").style("width")) - this.margin.left - this.margin.right;
    if (this.width < 300) {
        this.width = 300;
    }
    this.drawBarChart(this.listOfTagOptions[0], this.selectedStations);
  }


  showVariation(): void {
    // @ts-ignore
    barH6.innerHTML = "";
    // @ts-ignore
    lineH6.innerHTML = "";
    d3.select("#bar").selectAll("svg").remove();
    d3.select("#line").selectAll("svg").remove();
  }

  radioLog(value: string): void {
    if (this.radioValue === 'statistics') {
      this.maxMultipleCount = '1';
      this.listOfTagOptions = [];
      this.showStats();
    } else {
      this.maxMultipleCount = '6';
      this.listOfTagOptions = [];
      this.showVariation();
    }
  }

  selectLog(value: { label: string, value: string}): void {
    this.mapService.changeYears(this.listOfTagOptions);
    if (this.radioValue === 'statistics') {
      this.showStats();
      const stations = [];
/*
      this.mapService.getStations(this.listOfTagOptions[0]).subscribe(data => {
            data['features'].forEach((element) => {
                stations.push({ id: element['properties']['id'], name: element['properties']['addr']});
            });
            this.select_container.innerHTML = "";
            stations.forEach((station) => {
                      const option = document.createElement("option");
          option.innerHTML = station.name;
          this.select_container.appendChild(option);
          this.renderer.appendChild(this.select_div, this.select_container);
      });
      });
      */
    }
  }

}
