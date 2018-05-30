/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.8 - Activity: Your first visualization!
*/

d3.json("data/buildings.json").then((data) => {
  data.forEach(function(d) {
    d.height = +d.height;
  });
  console.log(data);

  var svg = d3.select("#chart-area").append("svg").attr("width",400).attr("height",400);

  var lines = svg.selectAll("rect").data(data);
  lines.enter().append("rect")
    .attr("height",(d) => {
      return d.height
    })
    .attr("x",(d,i) => {
      return (i * 50) + 25
    })
    .attr("width",30)
    .attr("stroke-width",5)
    .attr("fill","grey")


}).catch(error => {
  console.log(error)
})
