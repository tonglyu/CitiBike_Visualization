import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { PieArcDatum } from 'd3';
//import { legendColor } from 'd3';
export interface pies{ id: string; value:number;}


@Component({
  selector: 'app-analysis-age-view',
  templateUrl: './analysis-age-view.component.html',
  styleUrls: ['./analysis-age-view.component.css']
})
export class AnalysisAgeViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    d3.json("src/assets/pie_data_all.json").then(function (data:any) {
      console.log(data);

      var w = 200;
      //legend
  d3.select("#pie-chart")
      .append("g")
      .append("svg:image")
      .attr("xlink:href","src/assets/pielegend.png")
      .attr("x", "240")
      .attr("y","0")
      .attr("width", "90")
      .attr("height", "120");
       //   .append("svg")
         // .attr("width", w)
         // .attr("height", w);
      //color
      
   /*   var legendOrdinal = d3.legendColor()
      .shape("path", d3.symbol().type(d3.symbolCircle).size(150)())
      .shapePadding(10)
      .scale(color);

  legend_svg.append("g")
      .attr("class", "legend")
      .attr("transform", "translate(20,20)");

  legend_svg.select(".legend")
      .call(legendOrdinal);
*/

      var color = d3.scaleOrdinal()
          .domain(["20-29", "30-39", "40-49", "50+"])
          .range(["#00345b", "#f89921", "#8b1918", "#40817b"]);

    /*  var legendOrdinal = d3.legendColor()
          .shape("path", d3.symbol().type(d3.symbolCircle).size(150)())
          .shapePadding(10)
          .scale(color);

      legend_svg.append("g")
          .attr("class", "legend")
          .attr("transform", "translate(20,20)");

      legend_svg.select(".legend")
          .call(legendOrdinal);
       
      */
      //2013
      d3.select("body")
          .append("br");

      var svg2013 = d3.select("#svg2013")
          //.append("svg")
          .attr("width", w)
          .attr("height", w);
      var pie2013 = d3.pie()
          .value(function (d:any) { return d.X2013top1; })
          (data);
      var pietop22013 = d3.pie()
          .value(function (d:any) { return d.X2013top2; })(data);
      var pietop32013 = d3.pie()
          .value(function (d:any) { return d.X2013top3; })(data);
      var pietop42013 = d3.pie()
          .value(function (d:any) { return d.X2013top4; })(data);
      var pietop52013 = d3.pie()
          .value(function (d:any) { return d.X2013top5; })(data);
      var pietop62013 = d3.pie()
          .value(function (d:any) { return d.X2013top6; })(data);
      var pietop72013 = d3.pie()
          .value(function (d:any) { return d.X2013top7; })(data);
      var pietop82013 = d3.pie()
          .value(function (d:any) { return d.X2013top8; })(data);
      var pietop92013 = d3.pie()
          .value(function (d:any) { return d.X2013top9; })(data);
      var pietop102013 = d3.pie()
          .value(function (d:any) { return d.X2013top10; })(data);



      svg2013.append("text")
          .attr("x", "100")
          .attr("y", "100")
          .attr("class", "pieYear")
          .text("1st Popular");
      // createPieChart(data, w, svg1998, pie1998, pietop31998, pietop41998, pietop21998);
      var outerRadius = w / 2;
      var innerRadius = w / 3;

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

      //2014
      var svg2014 = d3.select("#svg2014")
         // .append("svg")
          .attr("width", w)
          .attr("height", w);
      var pie2014 = d3.pie()
          .value(function (d:any) { return d.X2014top1; })
          (data);
      var pietop32014 = d3.pie()
          .value(function (d:any) { return d.X2014top3; })(data);
      var pietop42014 = d3.pie()
          .value(function (d:any) { return d.X2014top4; })(data);
      var pietop22014 = d3.pie()
          .value(function (d:any) { return d.X2014top2; })(data);
      var pietop52014 = d3.pie()
          .value(function (d:any) { return d.X2014top5; })(data);
      var pietop62014 = d3.pie()
          .value(function (d:any) { return d.X2014top6; })(data);
      var pietop72014 = d3.pie()
          .value(function (d:any) { return d.X2014top7; })(data);
      var pietop82014 = d3.pie()
          .value(function (d:any) { return d.X2014top8; })(data);
      var pietop92014 = d3.pie()
          .value(function (d:any) { return d.X2014top9; })(data);
      var pietop102014 = d3.pie()
          .value(function (d:any) { return d.X2014top10; })(data);


      svg2014.append("text")
          .attr("x", "100")
          .attr("y", "100")
          .attr("class", "pieYear")
          .text("2nd Popular");
      var arcs2014 = svg2014.selectAll("g.arc")
          .data(pie2014)
          .enter()
          .append("g")
          .attr("class", "arc")
          .attr("opacity","0.7")
          .attr("transform", "translate(" + outerRadius + ", " + outerRadius + ")");
      arcs2014.append("path")
      //@ts-ignore
          .attr("fill", function (d, i) { return color(i); })
          //@ts-ignore
          .attr("d", arc)
          .each(function (d:any) { this._current = d; });

      //2015
      var svg2015 = d3.select("#svg2015")
        //  .append("svg")
          .attr("width", w)
          .attr("height", w);
      var pie2015 = d3.pie()
          .value(function (d:any) { return d.X2015top1; })
          (data);
      var pietop32015 = d3.pie()
          .value(function (d:any) { return d.X2015top3; })(data);
      var pietop42015 = d3.pie()
          .value(function (d:any) { return d.X2015top4; })(data);
      var pietop22015 = d3.pie()
          .value(function (d:any) { return d.X2015top2; })(data);

      var pietop52015 = d3.pie()
          .value(function (d:any) { return d.X2015top5; })(data);

      var pietop62015 = d3.pie()
          .value(function (d:any) { return d.X2015top6; })(data);

      var pietop72015 = d3.pie()
          .value(function (d:any) { return d.X2015top7; })(data);
      var pietop82015 = d3.pie()
          .value(function (d:any) { return d.X2015top8; })(data);
      var pietop92015 = d3.pie()
          .value(function (d:any) { return d.X2015top9; })(data);
      var pietop102015 = d3.pie()
          .value(function (d:any) { return d.X2015top10; })(data);


      svg2015.append("text")
          .attr("x", "100")
          .attr("y", "100")
          .attr("class", "pieYear")
          .text("3rd Popular");
      var arcs2015 = svg2015.selectAll("g.arc")
          .data(pie2015)
          .enter()
          .append("g")
          .attr("class", "arc")
          .attr("opacity","0.7")
          .attr("transform", "translate(" + outerRadius + ", " + outerRadius + ")");
      arcs2015.append("path")
      //@ts-ignore
          .attr("fill", function (d, i) { return color(i); })
          //@ts-ignore
          .attr("d", arc)
          .each(function (d:any) { this._current = d; });

      //2016
      var svg2016 = d3.select("#svg2016")
        // .append("svg")
          .attr("width", w)
          .attr("height", w);
      var pie2016 = d3.pie()
          .value(function (d:any) { return d.X2016top1; })
          (data);
      var pietop32016 = d3.pie()
          .value(function (d:any) { return d.X2016top3; })(data);
      var pietop42016 = d3.pie()
          .value(function (d:any) { return d.X2016top4; })(data);
      var pietop22016 = d3.pie()
          .value(function (d:any) { return d.X2016top2; })(data);

      var pietop52016 = d3.pie()
          .value(function (d:any) { return d.X2016top5; })(data);

      var pietop62016 = d3.pie()
          .value(function (d:any) { return d.X2016top6; })(data);

      var pietop72016 = d3.pie()
          .value(function (d:any) { return d.X2016top7; })(data);

      var pietop82016 = d3.pie()
          .value(function (d:any) { return d.X2016top8; })(data);
      var pietop92016 = d3.pie()
          .value(function (d:any) { return d.X2016top9; })(data);
      var pietop102016 = d3.pie()
          .value(function (d:any) { return d.X2016top10; })(data);




      svg2016.append("text")
          .attr("x", "100")
          .attr("y", "100")
          .attr("class", "pieYear")
          .text("4th Popular");
      var arcs2016 = svg2016.selectAll("g.arc")
          .data(pie2016)
          .enter()
          .append("g")
          .attr("class", "arc")
          .attr("opacity","0.7")
          .attr("transform", "translate(" + outerRadius + ", " + outerRadius + ")");
      arcs2016.append("path")
      //@ts-ignore
          .attr("fill", function (d, i) { return color(i); })
          //@ts-ignore
          .attr("d", arc)
          .each(function (d:any) { this._current = d; });



      //2017
      var svg2017 = d3.select("#svg2017")
        //  .append("svg")
          .attr("width", w)
          .attr("height", w);
      var pie2017 = d3.pie()
          .value(function (d:any) { return d.X2017top1; })(data);
      var pietop32017 = d3.pie()
          .value(function (d:any) { return d.X2017top3; })(data);
      var pietop42017 = d3.pie()
          .value(function (d:any) { return d.X2017top4; })(data);
      var pietop22017 = d3.pie()
          .value(function (d:any) { return d.X2017top2; })(data);
      var pietop52017 = d3.pie()
          .value(function (d:any) { return d.X2017top5; })(data);
      var pietop62017 = d3.pie()
          .value(function (d:any) { return d.X2017top6; })(data);
      var pietop72017 = d3.pie()
          .value(function (d:any) { return d.X2017top7; })(data);
      var pietop82017 = d3.pie()
          .value(function (d:any) { return d.X2017top8; })(data);

      var pietop92017 = d3.pie()
          .value(function (d:any) { return d.X2017top9; })(data);
      var pietop102017 = d3.pie()
          .value(function (d:any) { return d.X2017top10; })(data);

      svg2017.append("text")
          .attr("x", "100")
          .attr("y", "100")
          .attr("class", "pieYear")
          .text("5th Popular");
      var arcs2017 = svg2017.selectAll("g.arc")
          .data(pie2017)
          .enter()
          .append("g")
          .attr("class", "arc")
          .attr("opacity","0.7")
          .attr("transform", "translate(" + outerRadius + ", " + outerRadius + ")");
      arcs2017.append("path")
      //@ts-ignore
          .attr("fill", function (d, i) { return color(i); })
          //@ts-ignore
          .attr("d", arc)
          .each(function (d:any) { this._current = d; });



      //2018          
      var svg2018 = d3.select("#svg2018")
       //   .append("svg")
          .attr("width", w)
          .attr("height", w);
      var pie2018 = d3.pie()
          .value(function (d:any) { return d.X2018top1; })
          (data);
      var pietop32018 = d3.pie()
          .value(function (d:any) { return d.X2018top3; })(data);
      var pietop42018 = d3.pie()
          .value(function (d:any) { return d.X2018top4; })(data);
      var pietop22018 = d3.pie()
          .value(function (d:any) { return d.X2018top2; })(data);
      var pietop52018 = d3.pie()
          .value(function (d:any) { return d.X2018top5; })(data);
      var pietop62018 = d3.pie()
          .value(function (d:any) { return d.X2018top6; })(data);
      var pietop72018 = d3.pie()
          .value(function (d:any) { return d.X2018top7; })(data);
      var pietop82018 = d3.pie()
          .value(function (d:any) { return d.X2018top8; })(data);
      var pietop92018 = d3.pie()
          .value(function (d:any) { return d.X2018top9; })(data);
      var pietop102018 = d3.pie()
          .value(function (d:any) { return d.X2018top10; })(data);
      svg2018.append("text")
          .attr("x", "100")
          .attr("y", "100")
          .attr("class", "pieYear")
          .text("6th Popular");
      var arcs2018 = svg2018.selectAll("g.arc")
          .data(pie2018)
          .enter()
          .append("g")
          .attr("class", "arc")
          .attr("opacity","0.7")
          .attr("transform", "translate(" + outerRadius + ", " + outerRadius + ")");
      arcs2018.append("path")
      //@ts-ignore
          .attr("fill", function (d, i) { return color(i); })
          //@ts-ignore
          .attr("d", arc)
          .each(function (d:any) { this._current = d; });



      //top1
      d3.select("#top-1")
          .on("click", function () {
           var   path2013 = svg2013.selectAll("g.arc")
                  .select("path")
                  .data(pie2013);
              path2013.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);

           var   path2014 = svg2014.selectAll("g.arc")
                  .select("path")
                  .data(pie2014);
              path2014.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);

            var  path2015 = svg2015.selectAll("g.arc")
                  .select("path")
                  .data(pie2015);
              path2015.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);


            var  path2016 = svg2016.selectAll("g.arc")
                  .select("path")
                  .data(pie2016);
              path2016.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);

          var    path2017 = svg2017.selectAll("g.arc")
                  .select("path")
                  .data(pie2017);
              path2017.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);

          var    path2018 = svg2018.selectAll("g.arc")
                  .select("path")
                  .data(pie2018);
              path2018.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);
          })


      //top2
      d3.select("#top-2")
          .on("click", function () {
       var       path2013 = svg2013.selectAll("g.arc")
                  .select("path")
                  .data(pietop22013);
              path2013.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);


       var       path2014 = svg2014.selectAll("g.arc")
                  .select("path")
                  .data(pietop22014);
              path2014.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);
         var     path2015 = svg2015.selectAll("g.arc")
                  .select("path")
                  .data(pietop22015);
              path2015.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);

         var     path2016 = svg2016.selectAll("g.arc")
                  .select("path")
                  .data(pietop22016);
              path2016.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);
          var    path2017 = svg2017.selectAll("g.arc")
                  .select("path")
                  .data(pietop22017);
              path2017.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);
         var     path2018 = svg2018.selectAll("g.arc")
                  .select("path")
                  .data(pietop22018);
              path2018.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);

          })


      //top3
      d3.select("#top-3")
          .on("click", function () {
         var     path2013 = svg2013.selectAll("g.arc")
                  .select("path")
                  .data(pietop32013);
              path2013.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);


        var      path2014 = svg2014.selectAll("g.arc")
                  .select("path")
                  .data(pietop32014);
              path2014.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);


         var     path2015 = svg2015.selectAll("g.arc")
                  .select("path")
                  .data(pietop32015);
              path2015.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);

         var     path2016 = svg2016.selectAll("g.arc")
                  .select("path")
                  .data(pietop32016);
              path2016.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);
         var     path2017 = svg2017.selectAll("g.arc")
                  .select("path")
                  .data(pietop32017);
              path2017.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);
        var      path2018 = svg2018.selectAll("g.arc")
                  .select("path")
                  .data(pietop32018);
              path2018.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);

          })

      //top4
      d3.select("#top-4")
          .on("click", function () {
         var     path2013 = svg2013.selectAll("g.arc")
                  .select("path")
                  .data(pietop42013);
              path2013.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);



        var      path2014 = svg2014.selectAll("g.arc")
                  .select("path")
                  .data(pietop42014);
              path2014.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);


         var     path2015 = svg2015.selectAll("g.arc")
                  .select("path")
                  .data(pietop42015);
              path2015.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);



        var      path2016 = svg2016.selectAll("g.arc")
                  .select("path")
                  .data(pietop42016);
              path2016.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);



        var      path2017 = svg2017.selectAll("g.arc")
                  .select("path")
                  .data(pietop42017);
              path2017.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);



        var      path2018 = svg2018.selectAll("g.arc")
                  .select("path")
                  .data(pietop42018);
              path2018.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);

          })


      //top5
      d3.select("#top-5")
          .on("click", function () {
        var      path2013 = svg2013.selectAll("g.arc")
                 .select("path")
                  .data(pietop52013);
              path2013.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);


        var      path2014 = svg2014.selectAll("g.arc")
                  .select("path")
                  .data(pietop52014);
              path2014.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);


        var      path2015 = svg2015.selectAll("g.arc")
                  .select("path")
                  .data(pietop52015);
              path2015.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);

         var     path2016 = svg2016.selectAll("g.arc")
                  .select("path")
                  .data(pietop52016);
              path2016.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);
       var       path2017 = svg2017.selectAll("g.arc")
                  .select("path")
                  .data(pietop52017);
              path2017.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);
          var    path2018 = svg2018.selectAll("g.arc")
                  .select("path")
                  .data(pietop52018);
              path2018.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);

          })

      //top6
      d3.select("#top-6")
          .on("click", function () {
        var      path2013 = svg2013.selectAll("g.arc")
                  .select("path")
                  .data(pietop62013);
              path2013.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);


                  var    path2014 = svg2014.selectAll("g.arc")
                  .select("path")
                  .data(pietop62014);
              path2014.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);


                  var   path2015 = svg2015.selectAll("g.arc")
                  .select("path")
                  .data(pietop62015);
              path2015.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);

                  var     path2016 = svg2016.selectAll("g.arc")
                  .select("path")
                  .data(pietop62016);
              path2016.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);
                  var      path2017 = svg2017.selectAll("g.arc")
                       .select("path")
                  .data(pietop62017);
              path2017.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);
                  var       path2018 = svg2018.selectAll("g.arc")
                  .select("path")
                  .data(pietop62018);
              path2018.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);

          })

      //top7
      d3.select("#top-7")
          .on("click", function () {
            var      path2013 = svg2013.selectAll("g.arc")
                  .select("path")
                  .data(pietop72013);
              path2013.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);


                  var     path2014 = svg2014.selectAll("g.arc")
                  .select("path")
                  .data(pietop72014);
              path2014.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);


                  var     path2015 = svg2015.selectAll("g.arc")
                  .select("path")
                  .data(pietop72015);
              path2015.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);

                  var     path2016 = svg2016.selectAll("g.arc")
                  .select("path")
                  .data(pietop72016);
              path2016.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);
                  var      path2017 = svg2017.selectAll("g.arc")
                  .select("path")
                  .data(pietop72017);
              path2017.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);
                  var      path2018 = svg2018.selectAll("g.arc")
                  .select("path")
                  .data(pietop72018);
              path2018.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);


          })

      //top8
      d3.select("#top-8")
          .on("click", function () {
            var        path2013 = svg2013.selectAll("g.arc")
                  .select("path")
                  .data(pietop82013);
              path2013.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);


                  var       path2014 = svg2014.selectAll("g.arc")
                  .select("path")
                  .data(pietop82014);
              path2014.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);


                  var       path2015 = svg2015.selectAll("g.arc")
                  .select("path")
                  .data(pietop82015);
              path2015.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);

                  var      path2016 = svg2016.selectAll("g.arc")
                  .select("path")
                  .data(pietop82016);
                          path2016.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);
                  var       path2017 = svg2017.selectAll("g.arc")
                  .select("path")
                  .data(pietop82017);
                          path2017.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);
                  var        path2018 = svg2018.selectAll("g.arc")
                  .select("path")
                  .data(pietop82018);
              path2018.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);

          })


      //top9
      d3.select("#top-9")
          .on("click", function () {
            var       path2013 = svg2013.selectAll("g.arc")
                  .select("path")
                  .data(pietop92013);
              path2013.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);


                  var        path2014 = svg2014.selectAll("g.arc")
                  .select("path")
                  .data(pietop92014);
              path2014.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);


                  var        path2015 = svg2015.selectAll("g.arc")
                  .select("path")
                  .data(pietop92015);
              path2015.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);

                  var       path2016 = svg2016.selectAll("g.arc")
                  .select("path")
                  .data(pietop92016);
              path2016.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);
                  var       path2017 = svg2017.selectAll("g.arc")
                  .select("path")
                  .data(pietop92017);
              path2017.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);
                  var        path2018 = svg2018.selectAll("g.arc")
                  .select("path")
                  .data(pietop92018);
              path2018.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);

          })




      //top10
      d3.select("#top-10")
          .on("click", function () {
            var        path2013 = svg2013.selectAll("g.arc")
                  .select("path")
                  .data(pietop102013);
              path2013.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);


                  var        path2014 = svg2014.selectAll("g.arc")
                  .select("path")
                  .data(pietop102014);
              path2014.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);


                  var        path2015 = svg2015.selectAll("g.arc")
                  .select("path")
                  .data(pietop102015);
              path2015.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);

                  var        path2016 = svg2016.selectAll("g.arc")
                  .select("path")
                  .data(pietop102016);
              path2016.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);
                  var        path2017 = svg2017.selectAll("g.arc")
                  .select("path")
                  .data(pietop102017);
                path2017.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);
                  var       path2018 = svg2018.selectAll("g.arc")
                  .select("path")
                  .data(pietop102018);
              path2018.transition()
                  .duration(1000)
                  .attrTween("d", arcTween);

          })


  });

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


  }

}
