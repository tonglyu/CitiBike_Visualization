import { Component, OnInit, Renderer2 } from '@angular/core';
import { YEARS, COLORS } from '../constants';
import { MapService } from "../map.service";
import * as d3 from 'd3';

@Component({
    selector: 'app-select-attr',
    templateUrl: './select-attr.component.html',
    styleUrls: ['./select-attr.component.css']
})

export class SelectAttrComponent implements OnInit {

    constructor(private mapService: MapService, private renderer: Renderer2) { }
    //Radio value: 'variation' / 'statistics'
    radioValue = 'statistics';

    //Dropdown
    maxMultipleCount = '';
    Mode = 'default';
    listOfOption = [];
    listOfTagOptions = []; // selected tags
    chartsArea: any;
    borrowH6 = document.getElementById("borrowH6");
    returnH6 = document.getElementById("returnH6");
    borrowChart = document.getElementById("borrow");
    returnChart = document.getElementById("return");
    margin = { top: 30, right: 20, bottom: 50, left: 35 };
    height = 225 - this.margin.top - this.margin.bottom;
    width: any;
    listOfStations: any;
    //selectedStations = "";
    select_container: any;
    select_div: any;
    clickedStation = {};


    ngOnInit(): void {
        const children = [];
        YEARS.forEach(year => {
            children.push({ label: year, value: year });
        })
        this.listOfOption = children;
        this.listOfTagOptions = ["2013"];
        this.showStats({ 'Year': "2013", 'Id': "470", 'Name': "W 20 St & 8 Ave" });
        this.mapService.changeYears(this.listOfTagOptions);
        this.mapService.stationSource.subscribe((station) => {
            this.clickedStation = station;
            this.showStats(station);
        });
    }

    drawBarChart(year: any, id: string, chart: string): void {
        var bar_container = d3.select("#" + chart)
            .select("svg")
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom);

        var bar = bar_container
            .select("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

        var width = this.width;
        var height = this.height;
        var margin = this.margin;
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
            if (data.length == 0) {
                data = {
                    0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0,
                    6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0,
                    12: 0, 13: 0, 14: 0, 15: 0, 16: 0, 17: 0,
                    18: 0, 19: 0, 20: 0, 21: 0, 22: 0, 23: 0
                }
            }
            else {
                data = data[0];
            }

            // set axis
            var hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

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

            var rects = bar.selectAll('rect')
                .data(hours)

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

            bar.selectAll(".label")
                .data(hours)
                .attr('x', function (d, i) { return x(i) + x.bandwidth() / 2; })
                .attr('y', function (d, i) {
                    if (data[i] > 600) {
                        return y(600) - 10;
                    } else {
                        return y(data[i]) - 10;
                    }
                })
                .text(function (d, i) {
                    return data[i];
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

            bar.selectAll("text")
                .data(hours).enter()
                .append("text")
                .attr("class", function (d, i) { return "label label" + i; })
                .attr('x', function (d, i) { return x(i) + x.bandwidth() / 2; })
                .attr('y', function (d, i) {
                    if (data[i] > 600) {
                        return y(600) - 10;
                    } else {
                        return y(data[i]) - 10;
                    }
                })
                .attr("font-size", 0)
                .attr("fill", "black")
                .attr("text-anchor", "middle")
                .text(function (d, i) {
                    return data[i];
                });


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

            bar.selectAll("#x-label")
                .data([0])
                .enter()
                .append("text")
                .attr("x", width / 2)
                .attr("y", height + 35)
                .attr("font-weight", "bold")
                .attr("id", "x-label")
                .text("Hour");

            bar.selectAll("#y-label")
                .data([0])
                .enter()
                .append("text")
                .attr("x", -25)
                .attr("y", -10)
                .attr("font-weight", "bold")
                .attr("id", "x-label")
                .text("Bikes");

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

        });
    }

    showStats(station: object): void {
        function isEmpty(obj) {
            for (var key in obj) {
                if (obj.hasOwnProperty(key))
                    return false;
            }
            return true;
        }
        if (this.listOfTagOptions.length == 0 || isEmpty(station)) {
            return;
        }
        // @ts-ignore
        borrowH6.innerHTML = "Borrow from <b><i>" + station['Name'] + "</i></b> station";
        // @ts-ignore
        returnH6.innerHTML = "Return to <b><i>" + station['Name'] + "</i></b> station";
        this.width = parseInt(d3.select("#borrow").style("width")) - this.margin.left - this.margin.right;
        if (this.width < 300) {
            this.width = 300;
        }
        this.drawBarChart(this.listOfTagOptions, station['Id'], "borrow");
        this.drawBarChart(this.listOfTagOptions, station['Id'], "return");
    }

    drawTimeChart(select_years: any): void {
        //@ts-ignore
        borrowH6.innerHTML = "<b>The Average Activities for Total Stations per hour<b>";
        document.getElementById("borrow").innerHTML = "<svg><g></g></svg>";

        var width = this.width;
        var height = 270 - this.margin.top - this.margin.bottom;;
        var margin = this.margin;

        var svg_container = d3.select("#borrow").select("svg")
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", height + this.margin.top + this.margin.bottom);

        var svg = svg_container.select("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
        var lineOpacity = "1";
        var lineOpacityHover = "0.85";
        var otherLinesOpacityHover = "0.1";
        var lineStroke = 1.5;
        var lineStrokeHover = "3";
        var duration = 250;

        var circleOpacity = "0.5"
        var circleRadius = 4;
        var circleStroke = 1.5;
        var circleStrokeColor = 'white';

        var line_points = []
        d3.json('src/assets/statistics/time.json').then(function (data: any) {
            var times = data.map(d => d['Time']);
            var all_years = d3.keys(data[0]).filter(function (key) {
                return key !== "Time";
            });

            var format_data = all_years.map(function (one_year) {
                return {
                    Year: one_year,
                    Values: data.map(function (d) {
                        return {
                            Time: d['Time'],
                            Use: +d[one_year]
                        };
                    })
                };
            });

            format_data.forEach(point => {
                if (select_years.includes(point.Year)) {
                    line_points.push(point)
                }
            })

            //check if drawing data is empty
            if (line_points.length == 0) {
                return;
            }

            var ymax = d3.max(line_points, function (d: any) {
                return d3.max(d.Values, function (v: any) {
                    return v.Use;
                })
            })

            // @ts-ignore
            ymax = (parseInt(ymax / 50) + 1) * 50

            // axis
            var x = d3.scalePoint()
                .domain(times)
                .range([0, width]);
            var y = d3.scaleLinear()
                // @ts-ignore
                .domain([0, ymax])
                .range([height, 0]);

            // @ts-ignore
            var xAxis = d3.axisBottom()
                .scale(x);
            // @ts-ignore
            var yAxis = d3.axisLeft()
                .scale(y);

            // append axis
            svg.selectAll(".x-axis")
                .data([0])
                .enter()
                .append("g")
                .attr("transform", "translate(0," + height + ")")
                .attr("class", "x-axis")
                .call(xAxis);
            svg.selectAll(".y-axis")
                .data([0])
                .enter()
                .append("g")
                .attr("class", "y-axis")
                .call(yAxis);

            svg.append("text")
                .attr("x", width / 2)
                .attr("y", height + 35)
                .attr("font-weight", "bold")
                .attr("id", "x-label")
                .text("Hour");

            svg.append("text")
                .attr("x", -20)
                .attr("y", -10)
                .attr("font-weight", "bold")
                .text("Activities (in thousands)");
            // @ts-ignore
            var line = d3.line()
                .x(function (d) { return x(d['Time']); })
                .y(function (d) { return y(d['Use']); });

            var lines = svg.selectAll(".lines")
                .data(line_points)
                .enter()
                .append("g")
                .attr("class", "lines");

            // add paths
            lines.append("path")
                .attr("class", "line")
                .attr("d", function (d) {
                    return line(d['Values']);
                })
                .attr("fill", "none")
                .attr("stroke-width", lineStroke)
                .attr("stroke", function (d, i: any) {
                    return COLORS[d["Year"]];
                })
                .on("mouseover", function (d, i: any) {
                    d3.selectAll(".line")
                        .transition()
                        .duration(duration)
                        .style('opacity', otherLinesOpacityHover);

                    d3.select(this)
                        .transition()
                        .duration(duration)
                        .style('opacity', lineOpacityHover)
                        .style("stroke-width", lineStrokeHover)
                        .style("cursor", "pointer");
                })
                .on("mousemove", function (d, i: any) {
                    d3.selectAll(".line")
                        .transition()
                        .duration(duration)
                        .style('opacity', otherLinesOpacityHover);

                    d3.select(this)
                        .transition()
                        .duration(duration)
                        .style('opacity', lineOpacityHover)
                        .style("stroke-width", lineStrokeHover)
                        .style("cursor", "pointer");
                })
                .on("mouseout", function (d, i: any) {
                    d3.selectAll(".line")
                        .transition()
                        .duration(duration)
                        .style('opacity', lineOpacity);

                    d3.select(this)
                        .transition()
                        .duration(duration)
                        .style("stroke-width", lineStroke)
                        .style("cursor", "none");
                })
            // Draw the empty value for every point
            var points = svg.selectAll('.points')
                .data(line_points)
                .enter()
                .append('g')
                .attr('class', 'points')
                .append('text');

            // Draw the circle
            lines.style("fill", function (d) { return COLORS[d["Year"]] })
                .selectAll("circle.line")
                .data(function (d: any) { return d.Values })
                .enter()
                .append("circle")
                .attr("r", circleRadius)
                .style("opacity", circleOpacity)
                .attr('stroke', circleStrokeColor)
                .attr('stroke-width', circleStroke)
                .attr("cx", (d: any) => { return x(d.Time); })
                .attr("cy", (d: any) => { return y(d.Use); });

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

            var timeScales = data.map(function (d) { return x(d.Time); });

            function mouseover() {
                focus.style("display", null);
                d3.selectAll('.points text')
                    .style("display", null);
            }

            function mouseout() {
                focus.style("display", "none");
                d3.selectAll('.points text')
                    .style("display", "none");
            }

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
        })
    }

    initDrawingCanvas(): void {
        // @ts-ignore
        borrowH6.innerHTML = "<p>Station Activity: select a <b>year</b> and a <b>station</b> on the map to see the activities in the station</p><p>Station Variation: select <b>muptiple years</b> to see the variation (try different <b>order</b>)</p>";
        // @ts-ignore
        returnH6.innerHTML = "";
        document.getElementById("borrow").innerHTML = "<svg><g></g></svg>";
        document.getElementById("return").innerHTML = "<svg><g></g></svg>";
        document.getElementById("description").innerHTML = "";
        document.getElementById("table").innerHTML = "";
        document.getElementById("table-des").innerHTML = "";
        this.width = parseInt(d3.select("#borrow").style("width")) - this.margin.left - this.margin.right;
        if (this.width < 300) {
            this.width = 300;
        }
    }

    addVariationDes(select_years: any): void {
        //@ts-ignore
        returnH6.innerHTML = "<b>Variation of stations' count<b>";
        var count_data = []
        d3.json('src/assets/statistics/counts.json').then(function (data: any) {
            data.forEach((d: any) => {
                count_data.push({
                    Year: +d['Year'],
                    Count: +d['Count']
                })
            })
            return count_data
        }).then(function (data) {
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

            if (diff >= 0) {
                document.getElementById("description")
                    .innerHTML = "From <b>" + year_min + "</b> to <b>" + year_max + "</b>, <b>" + diff + "</b> new stations have been installed."
            } else {
                document.getElementById("description")
                    .innerHTML = "From <b>" + year_min + "</b> to <b>" + year_max + "</b>, <b>" + (-diff) + "</b> stations have been uninstalled."
            }
        })
    }

    drawTableAndBar(select_years: any, mapService: any): void {
        var pop_diff = []
        document.getElementById("table").innerHTML = "";
        document.getElementById("table-des").innerHTML = "<b>Top 5 Neighborhoods of new installed stations<b>";
        document.getElementById("return").innerHTML = "<svg><g></g></svg>";
        var width = parseInt(d3.select("#return").style("width"));
        var height = this.height;
        var margin = this.margin;

        var table = d3.select('#table');
        var bar_container = d3.select("#return")
            .select("svg")
            .attr("width", width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom);

        var bar = bar_container
            .select("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

        var nei_id = {}
        d3.csv('src/assets/statistics/nyc.csv').then(function (data: any) {
            data.forEach(element => {
                nei_id[element['neighborho']] = element['id']
            });
        })

        d3.json('src/assets/statistics/block_counts.json').then(function (data: any) {
            var timeScalaes = data.map(d => d['Year']);
            var blocks = d3.keys(data[0]).filter(function (key) {
                return key !== "Year";
            });

            var format_data = blocks.map(function (block) {
                return {
                    Block: block,
                    Values: data.map(function (d) {
                        return {
                            Year: d['Year'],
                            Count: +d[block]
                        };
                    })
                };
            });

            var year_max = d3.max(select_years)
            var year_min = d3.min(select_years)
            format_data.forEach((rec: any) => {
                var count_min, count_max
                rec.Values.forEach((value: any) => {
                    if (value.Year == year_max) {
                        count_max = value.Count;
                    }
                    if (value.Year == year_min) {
                        count_min = value.Count;
                    }
                })
                pop_diff.push({
                    Block: rec.Block,
                    Id: nei_id[rec.Block],
                    Count: count_max - count_min
                })
            })

            pop_diff = pop_diff.sort(function (o1, o2) {
                return d3.descending(o1.Count, o2.Count);
            }).slice(0, 5)

            return pop_diff
        }).then(function (data: any) {
            if (data.length == 0) {
                return;
            }
            var title = [{ "Block": "Neighborhood", "Count": "Count" }];
            var zeroCount = 0
            var dataNoID = data.map(d => {
                if (d.Count == 0) {
                    zeroCount++
                }
                return {
                    Block: d.Block,
                    Count: d.Count
                }
            })

            var data_table = title.concat(dataNoID)

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

            // all-zeros do not draw chart
            if (zeroCount == data.length) {
                return;
            }
            var neighbors = data.map(function (d) { return d.Block; })
            var ymax = d3.max(data, (d: any) => { return d.Count; })

            var x = d3.scaleBand().domain(neighbors).rangeRound([0, width]).paddingInner(0.5);
            // @ts-ignore
            var y = d3.scaleLinear().domain([0, ymax]).range([height, 0])

            // @ts-ignore
            var xAxis = d3.axisBottom().scale(x);
            // @ts-ignore
            var yAxis = d3.axisLeft().scale(y);

            var rects = bar.selectAll('rect')
                .data(data)

            // append rect
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
                .on("mouseout", function (d: any, i) {
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

                    mapService.notShowNeighbor(d.Id);
                });

            bar.selectAll("text")
                .data(data).enter()
                .append("text")
                .attr("class", function (d, i) { return "label label" + i; })
                .attr('x', function (d: any) { return x(d.Block) + x.bandwidth() / 2; })
                .attr('y', function (d: any) { return y(d.Count) - 5; })
                .attr("font-size", 0)
                .attr("fill", "black")
                .attr("text-anchor", "middle")
                .text(function (d: any) { return d.Count; });

            bar.append("text")
                .attr("x", width / 2)
                .attr("y", height + 50)
                .attr("font-weight", "bold")
                .attr("text-anchor", "middle")
                .attr("id", "x-label")
                .text("Neighborhood");

            bar.selectAll("#y-label")
                .data([0])
                .enter()
                .append("text")
                .attr("x", -25)
                .attr("y", -10)
                .attr("font-weight", "bold")
                .attr("id", "x-label")
                .text("Count");

            // append axis
            bar.append("g")
                .attr("transform", "translate(0," + height + ")")
                .attr("class", "x-axis")
                .call(xAxis)
                .selectAll("text")
                .attr("dx", "-.6em")
                .attr("dy", ".8em")
                .attr('font-size', 10)
                .attr("transform", "rotate(-20)");

            bar.selectAll(".y-axis")
                .data([0])
                .enter()
                .append("g")
                .attr("class", "y-axis")
                .call(yAxis);



        })
    }


    radioLog(value: string): void {
        if (this.radioValue === 'statistics') {
            this.maxMultipleCount = '1';
            this.Mode = 'default';
            this.listOfTagOptions = [];
            this.initDrawingCanvas();
        } else {
            this.maxMultipleCount = '6';
            this.Mode = 'tags';
            this.listOfTagOptions = [];
            this.initDrawingCanvas();
        }
        this.mapService.changeAnalysis(this.radioValue);
        this.mapService.changeYears(this.listOfTagOptions);
    }

    selectLog(value: { label: string, value: string }): void {
        this.mapService.changeYears(this.listOfTagOptions);
        if (this.listOfTagOptions.length == 0) {
            this.initDrawingCanvas();
            return;
        }
        if (this.radioValue === 'statistics') {
            this.initDrawingCanvas();
        } else {
            this.drawTimeChart(this.listOfTagOptions)
            this.addVariationDes(this.listOfTagOptions)
            this.drawTableAndBar(this.listOfTagOptions, this.mapService)
        }
    }

}
