
var margin = {top: 20, right: 20, bottom: 20, left: 20},
    width = 370 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.05);

var y = d3.scaleLinear().range([height, 0]);

var xAxis = d3.axisBottom(x)
    .tickFormat(function(d) {return d.province;});

var yAxis = d3.axisLeft(y);

var svg = d3.select(".barplotdiv")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .classed("barplot-content", true);


d3.json("barplot.json").then(function(data) {
  data.forEach(function(d) {
    d.province = d.province;
    d.n_varieties = +d.n_varieties;
  });

  x.domain(data.map(function(d) {return d.province;}));
  y.domain([0, d3.max(data, function(d) { return d.n_varieties})]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)");


  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 5)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Number of Varieties")

  svg.selectAll("bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) {return x(d.province);})
      .attr("width", x.bandwidth())
      .attr("y", function(d) {return y(d.n_varieties);})
      .attr("height", function(d) {return height - y(d.n_varieties);});
});




/*
const margin = 20; // to add padding
const width = 500 - 2 * margin;
const height = 800 - 2 * margin;

const svg = d3.select("svg");

const chart = svg.append(g)
    .attr("transform", "translate(${margin}, ${margin})");



const yScale = d3.scaleLinear()
    .range([height, 0])
    .domain([0, 40]); // y axis goes from values of 0 - 40

const xScale = d3.scaleBand()
    .range([0, width])
    .domain(sample.map((s) -> s.province))
    .padding(0.2);


chart.append("g")
    .call(d3.axisLeft(yScale));

chart.append("g")
    .attr("transform", "trasnlate(0, ${height})")
    .call(d3.axisBottom(xScale));


chart.selectAll()
    .data(goals)
    .enter()
    .append("rect")
    .attr("x", (s) -> xScale(s.province))
    .attr("y", (s) -> yScale(s.value))
    .attr("height", (s) -> height - yScale(s.value))
    .attr("widht", xScale.bandWidth())

    */
