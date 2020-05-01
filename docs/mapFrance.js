
// Map province ID's to correct region
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
var centered;

const WIDTH = window.innerWidth*0.9, HEIGHT = window.innerHeight;
const OVERLAY_MULTIPLIER = 10;
const OVERLAY_OFFSET = OVERLAY_MULTIPLIER / 2 - 0.5;

// Fill province when hovering and add tooltip text
function mouseOverHandler(d, i) {
  d3.select(this)
    .attr("fill", function(d) {
        if (wineProvinces.includes(mapObj[d.properties.ID]))
        return "#8c1b0a";
      else
        return "white";
    })
    // Takes a while for the tooltip to load
    .append("svg:title")
    .text(function(d) {
      if(mapObj[d.properties.ID] == null)
        return d.properties.ID;
      else
        return mapObj[d.properties.ID];
    })
    /*.attr("transform", d => `translate(${path.centroid(d)})`)
    .attr("text-anchor", "middle")
    .attr("font-size", 10)
    .attr("class","labels")*/;
  }

function mouseOutHandler(d, i) {
  d3.select(this).attr("fill", function(d) {
      if (wineProvinces.includes(mapObj[d.properties.ID]))
      return "#fce8c9";
    else
      return "white";
});}

function clicked(d, i) {
  var x, y, k;

    if (d && centered !== d && wineProvinces.includes(mapObj[d.properties.ID])) {
    var centroid = path.centroid(d);
    x = centroid[0];
    y = centroid[1];
    k = 3;
    centered = d;
  } else {
    x = WIDTH / 2;
    y = HEIGHT / 2;
    k = 1;
    centered = null;
  }
  g.selectAll("path")
    .classed("active", centered && function(d) { return d === centered; });

  g.transition()
    .duration(750)
    .attr("transform", "translate(" + WIDTH / 2 + "," + HEIGHT / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")");
}

var svg = d3
  .select(".mapdiv")
  .attr("id", "svg")
  .append("svg")
  .attr("width", WIDTH)
  .attr("height", HEIGHT)
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", "0 -80 " + WIDTH * 1.5 + " " + HEIGHT)
  .classed("svg-content", true);

const path = d3
  .geoPath()
  .projection(d3.geoMercator()
    .center([4.6, 46.5])
    .scale(2600)
    .translate([WIDTH / 2, HEIGHT / 2]));

var g = svg.append("g");

const dbRef = firebase.database().ref()

// Need to check in original dataframe which regions are included in Southwest France
// and France Other and clean this into correct province
// Beaujolais is part of Bourgogne, need to add this to that province in python
wineProvinces = [];

d3.json("france.json").then(function(france) {
  //console.log(topojson.feature(france, france.objects.poly).features);

    g.selectAll("path")
        .data(topojson.feature(france, france.objects.poly).features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("class", "province")
        .attr("fill", "white")
        .style("stroke", "black");

    dbRef.child('provinces').once('value').then(function (snapshot) {
        console.log(snapshot.val())
        wineProvinces = snapshot.val();

        g.selectAll("path")
            .attr("fill", function (d) {
                if (wineProvinces.includes(mapObj[d.properties.ID]))
                    return "#fce8c9";
                else
                    return "white";
            })
            .on("mouseover", mouseOverHandler)
            .on("mouseout", mouseOutHandler)
            .on("click", clicked);;
    });

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
