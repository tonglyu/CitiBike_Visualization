import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
@Component({
  selector: 'app-analysis-infras-view',
  templateUrl: './analysis-infras-view.component.html',
  styleUrls: ['./analysis-infras-view.component.css']
})
export class AnalysisInfrasViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
    
interface SVGDatum {
      width: number;
      height: number;
      filterBrushEvent: boolean;
  }
  
  const svg = d3.select<SVGSVGElement, undefined>('#chart3')
      .datum<SVGDatum>({ width: 1500, height: 1500, filterBrushEvent: true })
      .attr('width', d => d.width)
      .attr('height', d => d.height);
  
      console.log(svg)

//import interpolateZoom from "d3-interpolate";
 //var svg = d3.select("#chart3");
 var  width = +svg.attr("width"),
      height = +svg.attr("height");

  //var svg2 = d3.select("#chart3")
  //var svg3 = d3.select("#chart3")




d3.json("src/assets/sky/nyc.json").then(function (nyc:any) {
  
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
      .attr("stroke-width",0.5)
      .attr("stroke","black")
      .attr("fill","#ffd460")
      .attr("stroke-dasharray",1)
      .on("mouseover", function(d:any) {
        console.log(d);
      d3.select(this)
      .style("stroke-width", 1.5)
      .style("stroke-dasharray", 0)
      
      d3.select("#neighborhoodPopover")
      .transition()
      .style("opacity", 0.7)
      .style("left", (d3.event.pageX+70) + "px")
      //.style("top", (d3.event.pageY) + "px")
      .style("top", (d3.event.pageY+70) + "px")
      .style("font-size","30px")
      .style("border-radius","20px")
      .style("border","0px")
      .style("padding","10px")
      .text(d.properties.neighborhood)

    })
    .on("mouseout", function(d) { 
      d3.select(this)
      .style("stroke-width", .25)
      .style("stroke-dasharray", 1)

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
  

    
    d3.json("src/assets/sky/2017.json").then(function(light:any){
      
      
      var projection2 = d3.geoConicConformal()
      .parallels([33, 45])
      .rotate([96, -39])
      .fitSize([width, height], nyc);



        //var location = 
        //console.log(light.features)
        svg.select("g")
        .attr("id","point")
        .attr("class", "bubble")
        .selectAll("circle")
        .data(light.features)
        // .sort(function(a, b) { return b.properties.population - a.properties.population; }))
        .enter().append("circle")
       // .attr("transform", function(d) { 
        //    console.log(path.centroid(d))  
          //  return "translate(" + path2(d) + ")"; })
          .attr("cx", function(d:any)
        {
           // console.log(laProjection(d.geometry.coordinates))
            return projection2(d.geometry.coordinates)[0];
        })
          .attr("cy",function(d:any)
        {
           // console.log(laProjection(d.geometry.coordinates))
            return projection2(d.geometry.coordinates)[1];
        })
            .attr("r", "2")
            .attr("fill","brown")
            .attr("fill-opacity","0.8")
            .attr("stroke","white")
                .attr("stroke-opacity",0)
                .attr("stroke-width",10)
        .on("mouseover", function(d:any) {


              console.log(d.properties.id);
              d3.select(this)
                .attr('opacity', 1)
                .attr("stroke", "black")

              var filename = d.properties.id+".json";
              console.log(filename);
            d3.json("src/assets/sky/"+filename).then(function(tz:any){
                //console.log(tz.features)
                var a0 = 0,
                    a1 = 0,
                    a2 = 0,
                    a3 = 0,
                    a4 = 0,
                    a5 = 0;
                console.log(tz.features.length);
                for(var i = 0 ;i<tz.features.length;i++)
                {
                  if(tz.features[i].properties.type == "0")
                  {
                    a0 = a0 +1;
                  }
                  if(tz.features[i].properties.type == "1")
                  {
                    a1 = a1 +1;
                  }
                  if(tz.features[i].properties.type == "2")
                  {
                    a2 = a2 +1;
                  }
                  if(tz.features[i].properties.type == "3")
                  {
                    a3 = a3 +1;
                  }
                  if(tz.features[i].properties.type == "4")
                  {
                    a4 = a4 +1;
                  }
                  if(tz.features[i].properties.type == "5")
                  {
                    a5 = a5 +1;
                  }
                }
                console.log(","+a1+","+a2+","+a3+","+a4+","+a5+","+a0);
                svg.select("g")
                .append("g")
                .attr("id","tem")
                .selectAll("image")
                .data(tz.features)
                .enter().append("svg:image")
                .attr("xlink:href",function(d:any)
                {
                  console.log(d.properties.type);
                  if(d.properties.type == "0")
                  {
                    return "src/assets/sky/subway.png";
                  }
                  else if(d.properties.type == "1")
                  {
                    return "src/assets/sky/hotel.png";
                  }
                  else if(d.properties.type == "2")
                  {
                    return "src/assets/sky/mall.png";
                  }
                  else if(d.properties.type == "6")
                  {
                    return "src/assets/sky/sight.png";
                  }
                  else if(d.properties.type == "4")
                  {
                    return "src/assets/sky/park.png";
                  }
                  else if(d.properties.type == "5")
                  {
                    return "src/assets/sky/gym.png";
                  }
                  else
                  {
                    return "src/assets/sky/hotel.png";
                  }
                
                })
                .attr("x", function(d:any)
                {
                  return projection2(d.geometry.coordinates)[0];
                })
                .attr("y",function(d:any)
                {
                  return projection2(d.geometry.coordinates)[1];
                })
                .attr("width", "10")
                .attr("height", "10");

       /*         .attr("cx", function(d)
                {
                  return projection2(d.geometry.coordinates)[0];
                })
                .attr("cy",function(d)
                {
                  return projection2(d.geometry.coordinates)[1];
                })
                  .attr("r", "3")
                  .attr("fill","orange")
                  .attr("strok-width","0")
                  */
                 d3.select("#detail")
                    .transition()
                    .style("opacity", 0.7)
                    .style("left", (d3.event.pageX-200) + "px")
                    //.style("top", (d3.event.pageY) + "px")
                    .style("top", (d3.event.pageY+70) + "px")
                    .style("font-size","30px")
                    .style("border-radius","20px")
                    .style("border","0px")
                    .style("padding","10px")
                    .text("hhhhhhhh")
              });

            })
            .on("mouseout", function(d:any) {
              
              d3.select(this)
                .attr('opacity', 0.8)
                .attr("stroke","white")
                .attr("stroke-opacity",0)
                .attr("stroke-width",6)
              svg.selectAll("#tem").remove()
            })
            .append("title")
            .text(function(d:any) {
                return "Station id: "+d.properties.id;
            });
    })  
    var g = d3.selectAll("g");
    var c = d3.selectAll("circle");
 // var svg3 = d3.select('#svg');
    
    var zoom = d3.zoom()
        .scaleExtent([1,20])
        .on("zoom", zoomed);
        
    //const svgOverlay: Selection<SVGRectElement, SVGDatum, HTMLElement, any> = 
    svg.call(zoom);

    function zoomed() {
      g.attr('transform',`translate(${d3.event.transform.x},  	 ${d3.event.transform.y}) scale(${d3.event.transform.k})`);
      c.attr('transform',`translate(${d3.event.transform.x},  	 ${d3.event.transform.y}) scale(${d3.event.transform.k})`);
    };

    // this function need to be called if we need zoom to center of the picture
    /*function transform() {
      return d3.zoomIdentity
          .translate(width / 2.75, height / 2.75)
          .scale(zoomLevel)
          .translate(-width/2.75, -height/2.75);
    }*/

    function transition(zoomLevel) {
      svg.transition()
          .delay(100)
          .duration(700)
          .call(zoom.scaleBy, zoomLevel);
          //.call(zoom.transform, transform);
          //.on("end", function() { canvas.call(transition); });
    }

    d3.selectAll('button').on('click', function(this:any) {
      if (this.id === 'zoom_in') {
        transition(1.5); // increase on 0.2 each time
      }
      if (this.id === 'zoom_out') {
        transition(0.6); // deacrease on 0.2 each time
      }
      if (this.id === 'zoom_init') {
        svg.transition()
            .delay(100)
            .duration(700)
            .call(zoom.scaleTo, 1); // return to initial state
      }
});

});
  }

}
