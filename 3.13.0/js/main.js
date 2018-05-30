/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/

var margin = {left : 100,right : 10,top : 10,bottom : 100};
var width = 600 - margin.left - margin.right;
var height = 400 - margin.top + margin.bottom;

var g = d3.select("#chart-area")
            .append("svg")
            .attr("width",width + margin.left + margin.right)
            .attr("height",height + margin.top + margin.bottom)
            .append("g")
        .attr("transform","translate(" + margin.left + ", " + margin.top + ")" )

g.append("text")
          .attr("class","x axis-label")
          .attr("x", width / 2)
          .attr("y", height + 140)
          .attr("font-size","20px")
          .attr("text-anchor","middle")
          .text("The world's tallest buildings");

g.append("text")
          .attr("class","y axis-label")
          .attr("x",-(height / 2))
          .attr("y", -60)
          .attr("font-size","20px")
          .attr("text-anchor","middle")
          .attr("transform","rotate(-90)")
          .text("Height (m)");

d3.json("../2.08.0/data/buildings.json").then((data) => {
  data.forEach(function(d) {
    d.height = +d.height;
  });
  console.log(data);

  var x = d3.scaleBand().domain(data.map(d => {return d.name}))
    .range([0,width])
    .paddingInner(0.3)
    .paddingOuter(0.3);

  var y = d3.scaleLinear().domain([0,d3.max(data,d => {return d.height})]).range([height,0]);

  var xAxisCall = d3.axisBottom(x);
  g.append("g")
    .attr("class","x axis")
    .attr("transform", "translate(0, " + height + ")")
    .call(xAxisCall)
    .selectAll("text")
    .attr("y","10")
    .attr("x","-5")
    .attr("text-anchor","end")
    .attr("transform","rotate(-40)")

var yAxisCall = d3.axisLeft(y).ticks(4).tickFormat(d => {return d + "m"})
g.append("g")
  .attr("class","y-axis")
  .call(yAxisCall);

  // var svg = d3.select("#chart-area").append("svg").attr("width",400).attr("height",400);
  //
  var rects = g.selectAll("rect").data(data);
  rects.enter().append("rect")
    .attr("height",(d) => {
      return height - y(d.height)
    })
    .attr("y",(d) => {return y(d.height)})
    .attr("x",d => {
      return x(d.name)
    })
    .attr("width",x.bandwidth)
    .attr("fill","grey")


}).catch(error => {
  console.log(error)
})
