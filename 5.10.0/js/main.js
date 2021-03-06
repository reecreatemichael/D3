

var margin = {left : 80,right : 20,top : 50,bottom : 100};
var width = 1200 - margin.left - margin.right;
var height = 900 - margin.top - margin.bottom;
var interval;
var cleanData;
var g = d3.select("#chart-area")
            .append("svg")
            .attr("width",width + margin.left + margin.right)
            .attr("height",height + margin.top + margin.bottom)
            .append("g")
            .attr("transform","translate(" + margin.left + ", " + margin.top + ")" )

var x = d3.scaleLog().base(10).domain([142, 150000]).range([0,width])

var area  =  d3.scaleLinear().range([25 * Math.PI,1500 * Math.PI]).domain([2000,1400000000]);

var y = d3.scaleLinear().domain([0,100]).range([height,-0])
var continentColor = d3.scaleOrdinal(d3.schemePastel1);


var time = 0;

var tip = d3.tip().attr("class","d3-tip").html(d => {
  var text= "<strong>Country:</strong><span style='color:red'>" + d.country + "</span><br>";
  text+= "<strong>Continent:</strong><span style='color:red'>" + d.continent + "</span><br>";
  text+= "<strong>Life Expectancy:</strong><span style='color:red'>" + d3.format(".2f")(d.life_exp) + "</span><br>";
  text+= "<strong>GPD:</strong><span style='color:red'>" + d3.format("$,.0f")(d.income) + "</span><br>";
  text+= "<strong>Population:</strong><span style='color:red'>" + d3.format(",.0f")(d.population) + "</span><br>";
  return text;
})
g.call(tip);

var xAxisGroup = g.append("g")
	.attr("class","x axis")
	.attr("transform", "translate(0," + height + ")")


	var yAxisGroup = g.append("g")
	.attr("class","y axis")

	g.append("text")
	          .attr("class","x axis-label")
	          .attr("x", width / 2)
	          .attr("y", height + 60)
	          .attr("font-size","20px")
	          .attr("text-anchor","middle")
	          .text("GPD per Capita in $");

	var yLabel = g.append("text")
	          .attr("class","y axis-label")
	          .attr("x",-(height / 2))
	          .attr("y", -60)
	          .attr("font-size","20px")
	          .attr("text-anchor","middle")
						.attr("transform","rotate(-90)")
	          .text("Life Expectancy");

	var timeLabel = g.append("text")
    .attr("y", height -10)
    .attr("x", width - 40)
    .attr("font-size", "40px")
    .attr("opacity", "0.4")
    .attr("text-anchor", "middle")
    .text("1800");

var continents = ["europe","africa","americas","asia"]
		var legend = g.append("g")
			.attr("transform","translate(" + (width - 10) + "," + (height - 125) + ")");

			continents.forEach((c,i) => {
				var legendRow = legend.append("g")
				.attr("transform","translate(0, " + (i * 20) + ")");

					legendRow.append("rect")
						.attr("width",10)
						.attr("height",10)
						.attr("fill",continentColor(c));

					legendRow.append("text")
						.attr("x",-10)
						.attr("y",10)
						.attr("text-anchor","end")
						.style("text-transform","capitalize")
						.text(c);

			});

		var xAxisCall = d3.axisBottom(x).tickValues([400,4000,40000]).tickFormat(d => {return "$" + d})
						xAxisGroup.call(xAxisCall)

		var yAxisCall = d3.axisLeft(y)
						yAxisGroup.call(yAxisCall);

d3.json("data/data.json").then(function(data){
	console.log(data);

 cleanData = data.map(year => {return year.countries.filter(country => {
	var dataExists = (country.income && country.life_exp);
	return dataExists
}).map(country => {
	country.income = +country.income;
	country.life_exp = + country.life_exp;
	return country;
	})
})

update(cleanData[0])

}).catch(error => {
  console.log(error)
})

$("#play-button").on("click",function() {
  var button = $(this);

  if(button.text() == "Play"){
     button.text("Pause");
     interval = setInterval(step,100);
   }
else {
  button.text("Play");
  clearInterval(interval);
}
})

$("#reset-button").on("click",function(){
  time = 0;
  update(cleanData[0])

})

function step() {
  time = (time < 214) ? time + 1 : 0
  update(cleanData[time])
}

function update(data){


//console.log(circles)

var t  = d3.transition().duration(100);

var continent = $("#continent-select").val();
var data = data.filter(function(d){
  if(continent == "all") {
    return true;
  }else{
    return d.continent == continent;
  }
})
var circles = g.selectAll("circle").data(data,d => {return d.country});
circles.exit()
	//.attr("fill","red")
	//.attr("class","exit")
	.remove()


circles.enter().append("circle")
	.attr("cy",y(9))
	.attr("cx",(d) => {
			return x(d.income)
	})
	.attr("r",d => {
			return Math.sqrt(area(d.population))
	})
	.attr("fill","grey")
  .on("mouseover",tip.show)
  .on("mouseout",tip.hide)
	.merge(circles)
	.transition(t)
	.attr("cy",(d) =>  {
			return y(d.life_exp)
	})
	.attr("cx",(d) => {
			return x(d.income)
	})
	.attr("fill",d => {
		return continentColor(d.continent)

})

 timeLabel.text(+(time + 1800))
}
