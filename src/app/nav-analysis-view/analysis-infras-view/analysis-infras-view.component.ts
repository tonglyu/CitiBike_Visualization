import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
//import { style } from '@angular/animations';
@Component({
  selector: 'app-analysis-infras-view',
  templateUrl: './analysis-infras-view.component.html',
  styleUrls: ['./analysis-infras-view.component.css']
})
export class AnalysisInfrasViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    document.getElementById("footer").style.display="none";
    interface SVGDatum {
      width: number;
      height: number;
      // viewbox:320,380,600,900;
      filterBrushEvent: boolean;
    }
    d3.select("body").attr("background", "#ececec")
    var svg = d3.select<SVGSVGElement, undefined>('#chart3')
      .datum<SVGDatum>({ width: 1000, height: 750, filterBrushEvent: true })
      .attr('width', d => d.width)
      .attr('height', d => d.height)
      .attr('viewBox', "125,180,530,400")
      .attr("class", "col-sm-12 col-md-12");

    console.log(svg)

    //import interpolateZoom from "d3-interpolate";
    //var svg = d3.select("#chart3");
    var width = +svg.attr("width"),
      height = +svg.attr("height"),
      centered;

    //var svg2 = d3.select("#chart3")
    //var svg3 = d3.select("#chart3")
    //var string = "This map shows the top 13 popular sharing-bike stations. Each point represent a station.,Click the point to see the important infrastructures nearby."
      //var strs = string.split(",")

      var text = d3.select("#chart2")
                .append("text")
                .attr("font-size","17px")
                .attr("x",0)
                .attr("y",21)
                .text("This map shows the top 13 popular sharing-bike stations. Each point represent a station.")
            
                var text = d3.select("#chart2")
                .append("text")
                .attr("font-size","17px")
                .attr("x",0)
                .attr("y",44)
                .text("***Click the point to see the important infrastructures nearby***")
       

    

    d3.json("src/assets/sky/nyc.json").then(function (nyc: any) {

      //var zoom = d3.zoom().scaleExtent([1, 8]).on("zoom", zoomed);
      //var transform = d3.zoomTransform(this);
      console.log("tttttttttttt")



      var path = d3.geoPath()
        .projection(d3.geoConicConformal()
          .parallels([33, 45])
          .rotate([96, -39])
          .fitSize([width, height], nyc)
        );

      svg.append("g")
        .selectAll("path")
        .data(nyc.features)
        .enter().append("path")
        .attr("d", path)
        .attr("stroke-width", 0.3)
        .attr("stroke-opacity", 0.5)
        .attr("stroke", "black")
        //.attr("fill","#ffd460")
        .attr('fill', '#ddd')
        .attr("stroke-dasharray", 1)

        .on("mouseover", function (d: any) {
          console.log(d);
          d3.select(this)
            .style("stroke-width", 1.7)
            .style("stroke-dasharray", 0)
            .attr("stroke-opacity", 1)
            .attr("stroke", "orange")

          d3.select("#neighborhoodPopover")
            .transition()
            .style("opacity", 0.7)
            .style("left", (d3.event.pageX + 70) + "px")
            //.style("top", (d3.event.pageY) + "px")
            .style("top", (d3.event.pageY + 70) + "px")
            .style("font-size", "16px")
            .style("border-radius", "20px")
            .style("border", "0px")
            .style("padding", "10px")
            .text(d.properties.neighborhood)

        })
        .on("mouseout", function (d) {
          d3.select(this)
            .attr("stroke", "black")
            .style("stroke-width", 0.3)
            .style("stroke-dasharray", 1)
            .attr("stroke-opacity", 0.5)
            //.style("stroke-width", 0.5)

          d3.select("#cneighborhoodPopoverountyText")
            .transition()
            .style("opacity", 0);
        });

      /* d3.json("street.geojson").then(function(street){
         svg.select("g")
         .append("g")
         .selectAll("path")
         .data(street.features)
         .enter().append("path")
         .attr("d", path)
         .attr("opacity",0.5)
         .attr("fill","none")
       });
       */
      //console.log(nyc);



      d3.json("src/assets/sky/2017.json").then(function (light: any) {


        var projection2 = d3.geoConicConformal()
          .parallels([33, 45])
          .rotate([96, -39])
          .fitSize([width, height], nyc);

        

        //var location = 
        //console.log(light.features)
        svg.select("g")
          .attr("id", "point")
          .attr("class", "bubble")
          .selectAll("circle")
          .data(light.features)
          // .sort(function(a, b) { return b.properties.population - a.properties.population; }))
          .enter().append("circle")
          // .attr("transform", function(d) { 
          //    console.log(path.centroid(d))  
          //  return "translate(" + path2(d) + ")"; })
          .attr("cx", function (d: any) {
            // console.log(laProjection(d.geometry.coordinates))
            return projection2(d.geometry.coordinates)[0];
          })
          .attr("cy", function (d: any) {
            // console.log(laProjection(d.geometry.coordinates))
            return projection2(d.geometry.coordinates)[1];
          })
          .attr("r", "2")
          .attr("fill", "brown")
          .attr("fill-opacity", "0.8")
          .attr("stroke", "white")
          .attr("stroke-opacity", 0)
          .attr("stroke-width", 2)
          .on("mouseover", function (d: any) {
            //var X = d3.event.pageX,
            var Y = (projection2(d.geometry.coordinates)[1] - 110);
            //console.log(d3.event.pageX)
            //console.log(d3.event.pageY)
            //console.log(d.properties.id);
            d3.select(this)
              //.attr('opacity', 1)
              //.attr("stroke", "black")
              .attr("r", "12")
              .attr("fill-opacity", "0.2")
              
            //.attr("stroke","white")
            //.attr("stroke-opacity",1)
            //.attr("stroke-width",2)

            var filename = d.properties.id + ".json";
            console.log(filename);
            d3.json("src/assets/sky/" + filename).then(function (tz: any) {
              //console.log(tz.features)
              var a0 = 0,
                a1 = 0,
                a2 = 0,
                a6 = 0,
                a4 = 0,
                a5 = 0,
                a7 = 0;
              console.log(tz.features.length);
              for (var i = 0; i < tz.features.length; i++) {
                if (tz.features[i].properties.type == "0") {
                  a0 = a0 + 1;
                }
                if (tz.features[i].properties.type == "1") {
                  a1 = a1 + 1;
                }
                if (tz.features[i].properties.type == "2") {
                  a2 = a2 + 1;
                }
                if (tz.features[i].properties.type == "6") {
                  a6 = a6 + 1;
                }
                if (tz.features[i].properties.type == "4") {
                  a4 = a4 + 1;
                }
                if (tz.features[i].properties.type == "5") {
                  a5 = a5 + 1;
                }
                if (tz.features[i].properties.type == "7") {
                  a7 = a7 + 1;
                }
              }
              //console.log(","+a1+","+a2+","+a3+","+a4+","+a5+","+a0);
              var information = "Subway Station:" + a0 + "," +
                "Hotel: " + a1 + "," +
                "Shopping Mall: " + a2 + "," +
                "Park: " + a4 + "," +
                "Sports Center: " + a5 + "," +
                "Sightseeing: " + a6 + "," +
                "School: " + a7;

              svg.select("g")
                .append("g")
                .attr("id", "tem")
                .selectAll("image")
                .data(tz.features)
                .enter().append("svg:image")
                .attr("xlink:href", function (d: any) {
                  console.log(d.properties.type);
                  if (d.properties.type == "0") {
                    return "src/assets/sky/subway.svg";
                  }
                  else if (d.properties.type == "1") {
                    return "src/assets/sky/hotel.svg";
                  }
                  else if (d.properties.type == "2") {
                    return "src/assets/sky/mall.svg";
                  }
                  else if (d.properties.type == "6") {
                    return "src/assets/sky/camera.svg";
                  }
                  else if (d.properties.type == "4") {
                    return "src/assets/sky/park.svg";
                  }
                  else if (d.properties.type == "5") {
                    return "src/assets/sky/sports.svg";
                  }
                  else if (d.properties.type == "7") {
                    return "src/assets/sky/gov.svg";
                  }
                //  else {
                //    return "src/assets/sky/hotel.svg";
                //  }

                })
                .attr("x", function (d: any) {
                  return projection2(d.geometry.coordinates)[0];
                })
                .attr("y", function (d: any) {
                  return projection2(d.geometry.coordinates)[1];
                })
                .attr("width", "2")
                .attr("height", "2")
                .style("pointer-events","none");

           var  svg2 = d3.select("#chartinfo")
              svg
                .append("g")
                //.transition()
                .attr("id", "info")
                .append("rect")

                // .attr("fill","black")

                .attr("fill-opacity", 0.5)
                .style("x", (190) + "px")
                .style("y", (200)+ "px")
                // .style("x", (X-420)+"px")
                // .style("y", (Y+50)+"px")
                //.style("x", (projection2(d.geometry.coordinates)[0] - 220) + "px")
                //.style("y", (projection2(d.geometry.coordinates)[1] - 50) + "px")

                .style("width", 135)
                .style("height", 190)
                .attr("rx", 20)
                .attr("ry", 20)
                //.style("left",X+"px")
                //.style("top",Y+"px")
                //.style("left", (d3.event.pageX+70) + "px")
                //.style("top", (d3.event.pageY) + "px")
                .attr("stroke-opacity", 0.8)
                .attr("stroke", "blue")
                .attr("stroke-width", 0)
              //  .style("font-size","20px")
              //  .style("border-radius","20px")
              //  .style("border","0px")
              //  .style("padding","10px")

              var strlist = information.split(",");
              var wenzi = svg.select("#info")
                .selectAll("text")
                .data(strlist)
                .enter()
                .append("text")
                // .text(information)
                .attr('fill', 'white')
                .attr('x', 188 + "px")
                .attr('y', function (d, i) { return i * 25 +197 + "px" })
                .attr("opacity", 1)
                //.attr('text-anchor', 'middle')
                .style('font-size', '12px')
                .attr('dy', "2em")
                .attr('dx', "2em")
                .text(function (d) { return d })
//!!!!!!!!!!!!!
              svg
                .select("#info")
                .append("svg:image")
                .attr("xlink:href","src/assets/sky/park.svg")
              //  .attr("fill-opacity", 0.6)
                // .style("x", (X-420)+"px")
                // .style("y", (Y+50)+"px")
                .attr("x", "578")
                .attr("y", "210")
                .attr("width", "20")
                .attr("height", "20");

                svg
                .select("#info")
                .append("svg:image")
                .attr("xlink:href","src/assets/sky/subway.svg")
              //  .attr("fill-opacity", 0.6)
                // .style("x", (X-420)+"px")
                // .style("y", (Y+50)+"px")
                .attr("x", "578")
                .attr('y', "239")
                .attr("width", "20")
                .attr("height", "20");

                svg
                .select("#info")
                .append("svg:image")
                .attr("xlink:href","src/assets/sky/mall.svg")
              //  .attr("fill-opacity", 0.6)
                // .style("x", (X-420)+"px")
                // .style("y", (Y+50)+"px")
                .attr("x", "578")
                .attr("y", "266")
                .attr("width", "20")
                .attr("height", "20");

                svg
                .select("#info")
                .append("svg:image")
                .attr("xlink:href","src/assets/sky/camera.svg")
              //  .attr("fill-opacity", 0.6)
                // .style("x", (X-420)+"px")
                // .style("y", (Y+50)+"px")
                .attr("x", "578")
                .attr("y", "294")
                .attr("width", "20")
                .attr("height", "20");

                svg
                .select("#info")
                .append("svg:image")
                .attr("xlink:href","src/assets/sky/gov.svg")
              //  .attr("fill-opacity", 0.6)
                // .style("x", (X-420)+"px")
                // .style("y", (Y+50)+"px")
                .attr("x", "578")
                .attr("y", "322")
                .attr("width", "20")
                .attr("height", "20");

                svg
                .select("#info")
                .append("svg:image")
                .attr("xlink:href","src/assets/sky/hotel.svg")
              //  .attr("fill-opacity", 0.6)
                // .style("x", (X-420)+"px")
                // .style("y", (Y+50)+"px")
                .attr("x", "578")
                .attr("y", "350")
                .attr("width", "20")
                .attr("height", "20");

                svg
                .select("#info")
                .append("svg:image")
                .attr("xlink:href","src/assets/sky/sports.svg")
              //  .attr("fill-opacity", 0.6)
                // .style("x", (X-420)+"px")
                // .style("y", (Y+50)+"px")
                .attr("x", "578")
                .attr("y", "378")
                .attr("width", "20")
                .attr("height", "20");

                svg
                .select("#info")
                .append("text")
              //  .attr("xlink:href","src/assets/sky/sports.svg")
              //  .attr("fill-opacity", 0.6)
                // .style("x", (X-420)+"px")
                // .style("y", (Y+50)+"px")
                .attr("x", "605")
                .attr("y", "228")
                .attr("font-size", "10")
                .attr("font-color", "black")
                .text("Park");

                svg
                .select("#info")
                .append("text")
              //  .attr("xlink:href","src/assets/sky/sports.svg")
              //  .attr("fill-opacity", 0.6)
                // .style("x", (X-420)+"px")
                // .style("y", (Y+50)+"px")
                .attr("x", "605")
                .attr("y", "253")
                .attr("font-size", "10")
                .attr("font-color", "black")
                .text("Subway");

                svg
                .select("#info")
                .append("text")
              //  .attr("xlink:href","src/assets/sky/sports.svg")
              //  .attr("fill-opacity", 0.6)
                // .style("x", (X-420)+"px")
                // .style("y", (Y+50)+"px")
                .attr("x", "605")
                .attr("y", "281")
                .attr("font-size", "10")
                .attr("font-color", "black")
                .text("Mall");

                svg
                .select("#info")
                .append("text")
              //  .attr("xlink:href","src/assets/sky/sports.svg")
              //  .attr("fill-opacity", 0.6)
                // .style("x", (X-420)+"px")
                // .style("y", (Y+50)+"px")
                .attr("x", "605")
                .attr("y", "308")
                .attr("font-size", "10")
                .attr("font-color", "black")
                .text("Sightseeing");

                svg
                .select("#info")
                .append("text")
              //  .attr("xlink:href","src/assets/sky/sports.svg")
              //  .attr("fill-opacity", 0.6)
                // .style("x", (X-420)+"px")
                // .style("y", (Y+50)+"px")
                .attr("x", "605")
                .attr("y", "337")
                .attr("font-size", "10")
                .attr("font-color", "black")
                .text("School");

                svg
                .select("#info")
                .append("text")
              //  .attr("xlink:href","src/assets/sky/sports.svg")
              //  .attr("fill-opacity", 0.6)
                // .style("x", (X-420)+"px")
                // .style("y", (Y+50)+"px")
                .attr("x", "605")
                .attr("y", "365")
                .attr("font-size", "10")
                .attr("font-color", "black")
                .text("Hotel");

                svg
                .select("#info")
                .append("text")
              //  .attr("xlink:href","src/assets/sky/sports.svg")
              //  .attr("fill-opacity", 0.6)
                // .style("x", (X-420)+"px")
                // .style("y", (Y+50)+"px")
                .attr("x", "605")
                .attr("y", "392")
                .attr("font-size", "10")
                .attr("font-color", "black")
                .text("Sports Center");


//!!!!!!!!!!!!!
            });

          })
          .on("mouseout", function (d: any) {
            d3.selectAll("#info").remove()
            svg.selectAll("#tem").remove()
            d3.select(this)
              .attr('fill-opacity', 0.8)
              .attr('r', 2)
              .attr("stroke", "white")
              .attr("stroke-opacity", 0)
              .attr("stroke-width", 2)


          })
          .on("click", transitioncenter
            //console.log(d.geometry.coordinates);
            // transitioncenter(projection2(d.geometry.coordinates[0]),projection2(d.geometry.coordinates[1]))
            //zoomed();
            //transition(15);
          )
          .append("title")
          .text(function (d: any) {

            return "Station id:"+d.properties.id+"\n"+"Addr: " + d.properties.addr;
          });
      })
      var g = d3.selectAll("g");
      var c = d3.selectAll("circle");
      // var svg3 = d3.select('#svg');

      var zoom = d3.zoom()
        .scaleExtent([1, 36])
        .on("zoom", zoomed);

      //const svgOverlay: Selection<SVGRectElement, SVGDatum, HTMLElement, any> = 
      //svg.call(zoom);

      function zoomed() {
        g.attr('transform', `translate(${d3.event.transform.x},  	 ${d3.event.transform.y}) scale(${d3.event.transform.k})`);
        c.attr('transform', `translate(${d3.event.transform.x},  	 ${d3.event.transform.y}) scale(${d3.event.transform.k})`);
      };



      // this function need to be called if we need zoom to center of the picture
      /*function transform() {
        return d3.zoomIdentity
            .translate(width / 2.75, height / 2.75)
            .scale(zoomLevel)
            .translate(-width/2.75, -height/2.75);
      }*/
      function transitioncenter(d) {
        var x, y, k;

        if (d && centered !== d) {
          var projection = d3.geoConicConformal()
            .parallels([33, 45])
            .rotate([96, -39])
            .fitSize([width, height], nyc);
          var centroid = path.centroid(d);
          //console.log("look" + centroid + "*******")
          //console.log("kool" + projection(d.geometry.coordinates)[0] + "," + projection(d.geometry.coordinates)[1] + "*******")
          x = centroid[0];
          y = centroid[1];
          k = 8;
          centered = d;
        } else {
          x = width / 2;
          y = height / 2;
          k = 1;
          centered = null;
        }

        //g.selectAll("path")
        //.classed("active", centered && function(d) { return d === centered; });

        g.transition()
          .duration(1000)
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + (-x-5) + "," + (-y-5) + ")")
          .style("stroke-width", 1.5 / k + "px");
        //var k =500;
        //g.selectAll("path")
        //.classed("active", centered && function(d) { return d === centered; });



      }
      
      function transition(zoomLevel) {
        svg.transition()
          .delay(100)
          .duration(1000)
          .call(zoom.scaleBy, zoomLevel);
        //.call(zoom.transform, transform);
        //.on("end", function() { canvas.call(transition); });
      }

      d3.selectAll('button').on('click', function (this: any) {
        if (this.id === 'zoom_in') {
          transition(1.5); // increase on 0.2 each time
        }
        if (this.id === 'zoom_out') {
          transition(0.6); // deacrease on 0.2 each time
        }
        if (this.id === 'zoom_init') {
          svg.transition()
            .delay(100)
            .duration(1000)
            .call(zoom.scaleTo, 1); // return to initial state
        }
      });

    });
  }

}
