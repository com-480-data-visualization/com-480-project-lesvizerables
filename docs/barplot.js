
var margin = {top: 20, right: 20, bottom: 135, left: 45};

var width = 360 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.05);

var y = d3.scaleLinear().range([height, 0]);

var xAxis = d3.axisBottom(x)
    .ticks(12)
    .tickFormat(function(d) {return d.province;});

var yAxis = d3.axisLeft(y);

var svg = d3.select(".barplotdiv")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .classed("barplot-content", true);

function highlightBar(pName) {
    svg.selectAll(".bar")
        .classed("active", function(d){
            if(d.province === pName){
                return true;
            }
            return false;
        });
}

function mediumlightBar(pName) {
    svg.selectAll(".bar")
        .classed("active", function(d){
            if(d.province === mapObj[centered.properties.ID].realname || d.province === pName){
                return true;
            }
            return false;
        });
}

function barClicked(d, i) {
    clicked(getProvinceNode(d.province), i);
}

function removeHighlight() {
    svg.selectAll(".bar")
        .classed("active", function(d) {
          return false;
        })
}

d3.json("barplot.json").then(function(data) {
  data.forEach(function(d) {
    d.province = d.province;
    d.n_varieties = +d.n_varieties;
  });

  x.domain(data.map(function(d) {return d.province;}));
  y.domain([0, d3.max(data, function(d) { return d.n_varieties})]);

  svg.append("g")
      .classed("axis", true)
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(5))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".40em")
      .attr("transform", "rotate(-50)");

  svg.append("g")
      .classed("axis", true)
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 5)
      .attr("dy", ".71em")
      .style("text-anchor", "end")

  svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font-size", "13px")
      .text("Number of varieties");

  svg.selectAll("bar")
      .data(data)
    .enter().append("rect")
      .classed("bar", true)
      .attr("id", function(d) {return (d.province);})
      .attr("x", function(d) {return x(d.province);})
      .attr("width", x.bandwidth())
      .attr("y", function(d) {return y(d.n_varieties);})
      .attr("height", function(d) {return height - y(d.n_varieties);})
      .on("click", barClicked);

  if (parameters && parameters["province"]){
      highlightBar(mapObj[parameters["province"]].realname);
  }
});
