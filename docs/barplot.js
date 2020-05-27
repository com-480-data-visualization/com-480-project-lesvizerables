
var margin = {top: 20, right: 20, bottom: 110, left: 30};
var width = 370 - margin.left - margin.right;
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
      .text("Number of Varieties")

  svg.selectAll("bar")
      .data(data)
    .enter().append("rect")
      .classed("bar", true)
      //.attr("id", function(d) {return (d.province);})
      .attr("id", function(d) {
        focusBar(d);
        return (d.province);

      })
      .attr("x", function(d) {return x(d.province);})
      .attr("width", x.bandwidth())
      .attr("y", function(d) {return y(d.n_varieties);})
      .attr("height", function(d) {return height - y(d.n_varieties);});



});


function handleSelected(centered, d) {
  if (centered == d) {
    var selected = mapObj[d.properties.ID].realname;

    var bars = document.getElementsByClassName("bar");
    var i;
    for (i = 0; i < bars.length; i++) {
      var  selectedBar = bars[i];
      if (selectedBar.id == selected) {
          //find a way to update svg

          g.selectAll("bar")
            .classed("active", true);
        //focusBar(selectedBar, true);
      }
    }
  }
}



/*

function focusBar(d, instant=false){
    var x, y, k;
    var centroid = path.centroid(d);
    x = centroid[0];
    y = centroid[1];
    k = 3;
    centered = d;

    g.selectAll("path")
      .classed("active", centered && function(d) { return d === centered; });

    var duration = 750;
    if(instant){
        duration = 0
    }
    g.transition()
      .duration(duration)
      .attr("transform", "translate(" + WIDTH / 2 + "," + HEIGHT / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")");
}

function handleClick(centered, d){
  if(centered == d){
    document.getElementById("prov-name").innerHTML = mapObj[d.properties.ID].realname;
    document.getElementById("barplot-id").innerHTML =
      "Scroll down to see the varieties that are produced in " + mapObj[d.properties.ID].realname + ".";
    //document.getElementById("page-instruction").innerHTML = "The varieties are sorted such that the most common variety is at the top.";

    showTable(true);
    if(dataCache){
      renderVarieties(d);
    }
    else{
      dbRef.child('prov_varieties').once('value').then(function (snapshot) {
        dataCache = snapshot.val();
        renderVarieties(d);
      });
    }
  }
  else{
    showTable(false);
    document.getElementById("prov-name").innerHTML = "Provinces";
    document.getElementById("prov-teaser").innerHTML = "Click on a wine province to see the varieties of wine produced.";
  }
}
*/
