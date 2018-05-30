/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/

var margin = {left : 80,right : 20,top : 50,bottom : 100};
var width = 600 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;

var flag = true;

var t  = d3.transition().duration(750);

var g = d3.select("#chart-area")
            .append("svg")
            .attr("width",width + margin.left + margin.right)
            .attr("height",height + margin.top + margin.bottom)
            .append("g")
        .attr("transform","translate(" + margin.left + ", " + margin.top + ")" )

        var x = d3.scaleBand()
          .range([0,width])
          .paddingInner(0.2)

        var y = d3.scaleLinear().range([height,-0]);
var xAxis = g.append("g")
  .attr("class","x axis")
  .attr("transform", "translate(0," + height + ")")
  // .selectAll("text")
  // .attr("y","10")
  // .attr("x","-5")
  // .attr("text-anchor","end");

var yAxis = g.append("g")
  .attr("class","y axis")

g.append("text")
          .attr("class","x axis-label")
          .attr("x", width / 2)
          .attr("y", height + 60)
          .attr("font-size","20px")
          .attr("text-anchor","middle")
          .text("Month");

var yLabel = g.append("text")
          .attr("class","y axis-label")
          .attr("x",-(height / 2))
          .attr("y", -60)
          .attr("font-size","20px")
          .attr("text-anchor","middle")
          .attr("transform","rotate(-90)")
          .text("Revenue");

d3.json("data/revenues.json").then((data) => {
  data.forEach(function(d) {
    d.profit = +d.profit;
    d.revenue = +d.revenue;
  });
  console.log(data);
  d3.interval(() => {
    var newdata = flag ? data : data.slice(0);
    update(newdata)
    flag = !flag
  }, 1000);

  update(data);


}).catch(error => {
  console.log(error)
})


  function update(data){

    var val = flag ? "revenue" : "profit";

 x.domain(data.map(d => {return d.month}));
 y.domain([0,d3.max(data,d => {return d[val]})]);

  var xAxisCall = d3.axisBottom(x).ticks(3)
  xAxis.call(xAxisCall)

var yAxisCall = d3.axisLeft(y).ticks(10).tickFormat(d => {return "$" + d})
yAxis.call(yAxisCall);

  // var svg = d3.select("#chart-area").append("svg").attr("width",400).attr("height",400);

  var rects = g.selectAll("circle").data(data,d => {return d.month});

rects.exit()
    .attr("fill","red")
    .transition(t)
    .attr("cy",y(0))
  // for rect  .attr("height",0)
    .remove()

// rects.transition(t)
//   .attr("cy",(d) => {return y(d[val])})
//   .attr("cx",(d) => {return x(d.month) + x.bandwidth() / 2 })
// // for rect .attr("height",(d) => {return height - y(d[val])})
//   .attr("width",x.bandwidth);

  rects.enter().append("circle")
    .attr("cy",y(0))
// for rect   .attr("height",0)
    .attr("cx",(d) => {
      return x(d.month) + x.bandwidth() / 2
    })
    .attr("r",5)
  // for rect  .attr("width",x.bandwidth)
    .attr("fill","grey")
    .merge(rects)
    .transition(t)
    // for rect      .attr("height",(d) => {
    //   return height - y(d[val])
    // })
    .attr("cy",(d) => {return y(d[val])})
    .attr("cx",(d) => {return x(d.month)  + x.bandwidth() / 2})
    yLabel.text(val);

}
