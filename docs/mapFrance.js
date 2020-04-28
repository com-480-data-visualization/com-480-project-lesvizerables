var width = 960,
    height = 1160;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);
	
d3.json("../Data/france.json").then(function(france) {
	svg.append("path")
		  .datum(topojson.feature(france, france.objects.poly))
		  .attr("d", d3.geoPath().projection(d3.geoMercator()));
});