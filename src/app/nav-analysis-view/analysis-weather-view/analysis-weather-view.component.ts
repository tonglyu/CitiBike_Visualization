import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-analysis-weather-view',
  templateUrl: './analysis-weather-view.component.html',
  styleUrls: ['./analysis-weather-view.component.css']
})
export class AnalysisWeatherViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var svg = d3.select("#line-chart"),
        margin = { top: 20, right: 20, bottom: 110, left: 40 },
        margin2 = { top: 430, right: 20, bottom: 30, left: 40 }, 
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        height2 = +svg.attr("height") - margin2.top - margin2.bottom;
    var parseDate = d3.timeParse("%m/%d/%y");


//var legend_svg = d3.select("#div")
                //.append("svg")
                //.attr("width", 20)
                //.attr("height", 20);
            //color


           









    var x = d3.scaleTime().range([0, width]),
        x2 = d3.scaleTime().range([0, width]),
        y = d3.scaleLinear().range([height, 0]),
        y2 = d3.scaleLinear().range([height2, 0]);

    var xAxis = d3.axisBottom(x),
        xAxis2 = d3.axisBottom(x2),
        yAxis = d3.axisLeft(y);

    var brush = d3.brushX()
        .extent([[0, 0], [width, height2]])
        .on("brush end", brushed);

    var zoom = d3.zoom()
        .scaleExtent([1, Infinity])
        .translateExtent([[0, 0], [width, height]])
        .extent([[0, 0], [width, height]])
        .on("zoom", zoomed);

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

    function zoomed() {
        if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush") return; // ignore zoom-by-brush
        var t = d3.event.transform;
        x.domain(t.rescaleX(x2).domain());
        Line_chart.selectAll("#line1").attr("d", line1);
        Line_chart.selectAll("#line3").attr("d", line3);
        
        focus.select(".axis--x").call(xAxis);
        context.select(".brush").call(brush.move, x.range().map(t.invertX, t));
    }

    function type(d:any) {
        d.Date = parseDate(d.Date);
        d.orders = +d.orders;
        return d;
    }


    /// set line////******************************
    var line1 = d3.line()
        
        .x(function (d:any) { return x(d.Date); })
        .y(function (d:any) { return y(d.orders); });


    var line2 = d3.line()
    
        .x(function (d:any) { return x2(d.Date); })
        .y(function (d:any) { return y2(d.orders); });


    var line3 = d3.line()
    
        .x(function (d:any) { return x(d.Date); })
        .y(function (d:any) { return y(d.weather); });


     svg.append("defs")
        .append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:rect")
        .attr("width", width)
        .attr("height", height)
        .attr("x", 40)
        .attr("y", 0);


    var Line_chart = svg.append("g")
        .attr("clip-path", "url(#clip)")
        .attr("class", "focus")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        ;


    var focus = svg.append("g")
        .attr("class", "focus")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
       // .attr("clip-path", "url(#clip)");

    var context = svg.append("g")
        .attr("class", "context")
        .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");



    //load data
    d3.csv("src/assets/weatherdata.csv").then(function (data) {
        console.log(data);

            data.forEach(function (d:any) {
            d.Date = parseDate(d.Date);
                d.orders = +d.orders;
                d.weather = +d.weather;
            });
        

            x.domain(d3.extent(data, function (d:any) { return d.Date; }));
            y.domain([0, d3.max(data, function (d:any) { return d.orders; })]);
            x2.domain(x.domain());
            y2.domain(y.domain());


            focus.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            focus.append("g")
                .attr("class", "axis axis--y")
                .call(yAxis);


                
            //line 1
            Line_chart.append("path")
            .attr("id","line1")
                .datum(data)
                .attr("class", "line")
                .style("stroke", "orchid")
                //.style("clip-path", "url(#clip-rect)")
                //@ts-ignore
                .attr("d", line1);
                
            //line2
            Line_chart.append("path")
            .attr("id","line3")
                .datum(data)
                .attr("class", "line")
                .style("stroke", "lightskyblue")
                //@ts-ignore
                .attr("d", line3)
               // .style("clip-path", "url(#clip-rect)");

            //rect
            context.append("path")
            .attr("id","line2")
                .datum(data)
                .attr("class", "line")
                //@ts-ignore
                .attr("d", line2);


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


            console.log(data);
        });
  }

}
