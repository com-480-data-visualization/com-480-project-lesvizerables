
const WIDTH = window.innerWidth, HEIGHT = window.innerHeight;
const OVERLAY_MULTIPLIER = 10;
const OVERLAY_OFFSET = OVERLAY_MULTIPLIER / 2 - 0.5;

function mouseOverHandler(d, i) {
  d3.select(this).attr("fill", function(d) {
    if(wineProvinces.includes(mapObj[d.properties.ID]))
      return "#8c1b0a";
    else
      return "white";
  });}

function mouseOutHandler(d, i) {
  d3.select(this).attr("fill", function(d) {
    if(wineProvinces.includes(mapObj[d.properties.ID]))
      return "#fce8c9";
    else
      return "white";
});}

var svg = d3
  .select(".mapdiv")
  .attr("id", "svg")
  .append("svg")
  .attr("width", WIDTH)
  .attr("height", HEIGHT);

const path = d3
  .geoPath()
  .projection(d3.geoMercator()
    .center([4.6, 46.5])
    .scale(2600)
    .translate([WIDTH / 2, HEIGHT / 2]));

var g = svg.append("g");

var mapObj = {
  FR42: "Alsace",
  FR61: "Aquitaine",
  FR72: "Auvergne",
  FR25: "Basse-Normandie",
  FR26: "Bourgogne",
  FR52: "Bretagne",
  FR24: "Centre",
  FR21: "Champagne-Ardenne",
  FR83: "Corse",
  FR43: "Franche-Comté",
  FR23: "Haute-Normandie",
  FR10: "Ile-de-France",
  FR81: "Languedoc-Roussillon",
  FR63: "Limousin",
  FR41: "Lorraine",
  FR62: "Midi-Pyrénées",
  FR30: "Nord-Pas-de-Calais",
  FR51: "Pays-de-la-Loire",
  FR22: "Picardie",
  FR53: "Poitou-Charantes",
  FR82: "Provence-Alpes-Côtes d'Azur",
  FR71: "Rhône-Alpes"
};

wineProvinces = ["Bordeaux", "Bourgogne", "Alsace", "Pays-de-la-Loire",
  "Champagne-Ardenne", "Provence-Alpes-Côtes d'Azur",
  "Rhône-Alpes", "France Other", "Languedoc-Roussillon", "Southwest France", "Beaujolais"];

d3.json("france.json").then(function(france) {
	g.selectAll("path")
    .data(topojson.feature(france, france.objects.poly).features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("fill", function(d) {
      if(wineProvinces.includes(mapObj[d.properties.ID]))
        return "#fce8c9";
      else
        return "white";
    })
    .style("stroke", "black")
    .on("mouseover", mouseOverHandler)
    .on("mouseout", mouseOutHandler);

/* // This writes out all the country names on the map
  g.selectAll("text")
    .data(topojson.feature(france, france.objects.poly).features)
    .enter()
    .append("text")
    .text(function(d) {
      console.log(d.properties.ID)
      if(mapObj[d.properties.ID] == null)
        return d.properties.ID;
      else
        return mapObj[d.properties.ID];
    })
    .attr("transform", d => `translate(${path.centroid(d)})`)
    .attr("text-anchor", "middle")
    .attr("font-size", 10)
    .attr("class","labels");*/
});
