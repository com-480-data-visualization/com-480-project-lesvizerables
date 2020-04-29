
const WIDTH = window.innerWidth, HEIGHT = window.innerHeight;
const OVERLAY_MULTIPLIER = 10;
const OVERLAY_OFFSET = OVERLAY_MULTIPLIER / 2 - 0.5;

function mouseOverHandler(d, i) {
  d3.select(this).attr("fill", "black")
}
function mouseOutHandler(d, i) {
  d3.select(this).attr("fill", "grey")
}

var svg = d3
  .select(".mapdiv")
  .append("svg")
  .attr("width", WIDTH)
  .attr("height", HEIGHT);

/*// Overlay a transparent rectangle for pan and zoom.
const g = svg.append("g");

g
  .append("rect")
  .attr("width", WIDTH * OVERLAY_MULTIPLIER)
  .attr("height", HEIGHT * OVERLAY_MULTIPLIER)
  .attr(
    "transform",
    `translate(-${WIDTH * OVERLAY_OFFSET},-${HEIGHT * OVERLAY_OFFSET})`
  )
  .style("fill", "none")
  .style("pointer-events", "all");*/

const path = d3
  .geoPath()
  .projection(d3.geoMercator()
    .center([4.6, 46.5])
    .scale(2600)
    .translate([WIDTH / 2, HEIGHT / 2]));

d3.json("france.json").then(function(france) {
	svg
    .datum(topojson.feature(france, france.objects.poly))
    .append("path")
    .attr("d", path)
    .attr("fill", "grey")
    .style("stroke", "white")
    .on("mouseover", mouseOverHandler)
    .on("mouseout", mouseOutHandler);
});
