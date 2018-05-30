/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.5 - Activity: Adding SVGs to the screen
*/

var svg = d3.select("#chart-area").append("svg").attr("width",500).attr("height",400).attr("border",10).attr("stroke","pink").attr("stroke-width",10);

var circle = svg.append("circle").attr("cx",200).attr("cy",200).attr("r",100).attr("fill","blue");
var line = svg.append("line").attr("x1",100).attr("y1",100).attr("x2",300).attr("y2",300).attr("stroke","red");
var rect = svg.append("rect").attr("width",400).attr("height",150).attr("fill","yellow").attr("stroke-width",5).attr("stroke","RGB(0,0,0)");

var data = [25,20,10,5,30];
var svg = d3.select("#hehe").append("svg").attr("width",500).attr("height",300);

var circles = svg.selectAll("circle").data(data);
circles.enter().append("circle").attr("cx",(d,i) => {
  return (i * 50) + 25;
})
.attr("cy",25)
.attr("r",(d) => {
  return d;
})
.attr("fill","red");
