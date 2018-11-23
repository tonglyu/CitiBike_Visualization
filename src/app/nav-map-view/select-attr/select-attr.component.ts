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
  margin = {top: 20, right: 0, bottom: 50, left: 70};
  height = 200 - this.margin.top - this.margin.bottom;
  width: any;
  listOfStations = new Array();
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
  }

  drawBarChart(year: string): void {
    var bar_container = d3.select("#bar")
        .selectAll("svg")
        .data([0])
        .enter()
        .append("svg")
        .attr("width", this.width + this.margin.left + this.margin.right)
        .attr("height", this.height + this.margin.top + this.margin.bottom);

    var bar = bar_container.append("g")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    var width = this.width;
    var height = this.height;
    var margin = this.margin;
    d3.json('src/assets/statistics/bar.json').then(function (data: any) {

        // set axis
        var countries = data.map(obj => obj['Country']);

        var x = d3.scaleBand()
                .domain(countries)
                .range([0, width])
                .paddingInner(0.05);
        var y = d3.scaleLinear()
                .domain([0, 85000])
                .range([height, 0]);

        // @ts-ignore
        var xAxis = d3.axisBottom()
                .scale(x);
        // @ts-ignore
        var yAxis = d3.axisLeft()
                .scale(y);

        // append rect
        bar.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('x', function(d) { return x(d['Country']); })
            .attr('y', function(d) { return height - y(d['Year(2014)']); })
            .attr('width', x.bandwidth)
            .attr('height', function(d) { return y(d['Year(2014)']); })
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
            .text("Country");
        bar.append("text")
            .attr("x", -150)
            .attr("y", -50)
            .attr("transform", "rotate(-90)")
            .attr("font-weight", "bold")
            .text("Arrivals of Vistors in 2014");

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
                .attr('x', function(d) { return x(d['Country']); })

        };

        window.addEventListener("resize", resize);

    });
  }

  showStats(): void {
    // @ts-ignore
    barH6.innerHTML = "Bar Chart";
    // @ts-ignore
    lineH6.innerHTML = "Line Chart";
    this.width = parseInt(d3.select("#bar").style("width")) - this.margin.left - this.margin.right;
    if (this.width < 300) {
        this.width = 300;
    }
    this.drawBarChart(this.listOfTagOptions[0]);
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
      console.log(this.select_container);
    }
  }

}
