var width = window.innerWidth,
    height = window.innerHeight;

var svg = d3.select(".mapdiv")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json("france.json").then(function(france) {
	svg.append("path")
		  .datum(topojson.feature(france, france.objects.poly))
		  .attr("d", d3.geoPath().projection(d3.geoMercator().center([4.6, 46.5])
      .scale(2600)
      .translate([width / 2, height / 2])));
});
