/*
the creation and animations of the barplot on the page varieties.html
*/

// set padding around the plot
var margin = {top: 20, right: 20, bottom: 135, left: 45};

// set width and height of actual plot
var width = 360 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;

// set axis'
var x = d3.scaleBand().rangeRound([0, width]).padding(0.05);
var y = d3.scaleLinear().range([height, 0]);

var xAxis = d3.axisBottom(x)
    .ticks(12)
    .tickFormat(function(d) {return d.province;});

var yAxis = d3.axisLeft(y);

// create svg
var svg = d3.select(".barplotdiv")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .classed("barplot-content", true);

// hightlight the bar selected (matches with the map)
function highlightBar(pName) {
    svg.selectAll(".bar")
        .classed("active", function(d){
            if(d.province === pName){
                return true;
            }
            return false;
        });
}

// highlight the hovering of bars that matches the map when hovering
function mediumlightBar(pName) {
    svg.selectAll(".bar")
        .classed("inactive", function(d){
            if((centered && d.province === mapObj[centered.properties.ID].realname) || d.province === pName){
                return true;
            }
            return false;
        });
}

// get the province clicked in the barplot
function barClicked(d, i) {
    clicked(getProvinceNode(d.province), i);
}

// get the province hovered in the barplot
function barHoverOver(d, i) {
    mouseOverHandler(getProvinceNode(d.province), i);
}

// get the province unhovered in the barplot
function barHoverOut(d, i) {
    mouseOutHandler(getProvinceNode(d.province), i);
}

// remove highlight of all bars if none selected or hovered.
function removeHighlight() {
    svg.selectAll(".bar")
        .classed("active", function(d) {
          return false;
        })

    svg.selectAll(".bar")
        .classed("inactive", function(d) {
          return false;
        })
}

// creation of barplot with data from json file
d3.json("json/barplot.json").then(function(data) {
  // get data values for x and y axis
  data.forEach(function(d) {
    d.province = d.province;
    d.n_varieties = +d.n_varieties;
  });

  // set domain for x and y axis
  x.domain(data.map(function(d) {return d.province;}));
  y.domain([0, d3.max(data, function(d) { return d.n_varieties})]);

  // create x axis
  svg.append("g")
      .classed("axis", true)
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(5))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".40em")
      .attr("transform", "rotate(-50)");

  // create y axis
  svg.append("g")
      .classed("axis", true)
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 5)
      .attr("dy", ".71em")
      .style("text-anchor", "end")

  // set text for axis'
  svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font-size", "13px")
      .text("Number of varieties");

  // add data to the bars in the barplot.
  svg.selectAll("bar")
      .data(data)
    .enter().append("rect")
      .classed("bar", true)
      .attr("id", function(d) {return (d.province);})
      .attr("x", function(d) {return x(d.province);})
      .attr("width", x.bandwidth())
      .attr("y", function(d) {return y(d.n_varieties);})
      .attr("height", function(d) {return height - y(d.n_varieties);})
      .on("mouseover", barHoverOver)
      .on("mouseout", barHoverOut)
      .on("click", barClicked);

  // highlight bar in barplot if it matches
  if (parameters && parameters["province"]){
      highlightBar(mapObj[parameters["province"]].realname);
  }
});
