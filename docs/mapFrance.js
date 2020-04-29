var width = 960,
    height = 1160;

var svg = d3.select("body")
    .append("svg")
    .attr("viewBox", `0 0 960 1160`);
    //.attr("width", width)
    //.attr("height", height);
	
d3.json("france.json").then(function(france) {
	svg.append("path")
		  .datum(topojson.feature(france, france.objects.poly))
		  .attr("d", d3.geoPath().projection(d3.geoMercator()));
});