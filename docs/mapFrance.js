
// Map province ID's to correct region
// Need to check in original dataframe which regions are included in Southwest France
// and France Other and clean this into correct province
// Beaujolais is part of Bourgogne, need to add this to that province in python

var mapObj = {
  FR42: {realname: "Alsace", dataname: "Alsace"},
  FR61: {realname: "Aquitaine", dataname: "Aquitaine"},
  FR72: {realname: "Auvergne", dataname: null},
  FR25: {realname: "Basse-Normandie", dataname: null},
  FR26: {realname: "Bourgogne", dataname: "Bourgogne"},
  FR52: {realname: "Bretagne", dataname: null},
  FR24: {realname: "Centre", dataname: null},
  FR21: {realname: "Champagne-Ardenne", dataname: "Champagne-Ardenne"},
  FR83: {realname: "Corse", dataname: "Corse"},
  FR43: {realname: "Franche-Comté", dataname: "Franche-Comté"},
  FR23: {realname: "Haute-Normandie", dataname: null},
  FR10: {realname: "Ile-de-France", dataname: null},
  FR81: {realname: "Languedoc-Roussillon", dataname: "Languedoc-Roussillon"},
  FR63: {realname: "Limousin", dataname: null},
  FR41: {realname: "Lorraine", dataname: null},
  FR62: {realname: "Midi-Pyrénées", dataname: "Midi-Pyrénées"},
  FR30: {realname: "Nord-Pas-de-Calais", dataname: null},
  FR51: {realname: "Pays-de-la-Loire", dataname: "Pays-de-la-Loire"},
  FR22: {realname: "Picardie", dataname: null},
  FR53: {realname: "Poitou-Charantes", dataname: "Poitou-Charentes"},
  FR82: {realname: "Provence-Alpes-Côtes d'Azur", dataname: "Provence-Alpes-Côtes d'Azur"},
  FR71: {realname: "Rhône-Alpes", dataname: "Rhône-Alpes"}
};
var centered;

// Idea on something that we could do to make it a bit more fun
var funfacts = {
  FR26: "Bourgogne has the second highest rating of the wines in our dataset and the second highest average price.",
  FR21: "Champagne-Ardenne has the highest rating of the wines in our dataset and also the highest average price.",
  FR53: "Pointou-Charantes has the lowest rating of the wines in our dataset and also the lowest average price."
}

const WIDTH = window.innerWidth*0.9, HEIGHT = window.innerHeight;
const OVERLAY_MULTIPLIER = 10;
const OVERLAY_OFFSET = OVERLAY_MULTIPLIER / 2 - 0.5;

// Fill province when hovering and add tooltip text
function mouseOverHandler(d, i) {
  d3.select(this)
    .attr("fill", function(d) {
      if (mapObj[d.properties.ID].dataname)
        return "#8c1b0a";
      else
        return "white";
    })
    // Takes a while for the tooltip to load
    .append("svg:title")
    .text(function(d) {
      if(mapObj[d.properties.ID].realname == null)
        return d.properties.ID;
      else
        return mapObj[d.properties.ID].realname;
    })
  }

function mouseOutHandler(d, i) {
  d3.select(this).attr("fill", function(d) {
    if (mapObj[d.properties.ID].dataname)
      return "#fce8c9";
    else
      return "white";
});}

function clicked(d, i) {
  var x, y, k;

  if (d && centered !== d && mapObj[d.properties.ID].dataname) {
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

  handleClick(centered, d);
}

var svg = d3
  .select(".mapdiv")
  .attr("id", "svg")
  .append("svg")
  .attr("width", WIDTH)
  .attr("height", HEIGHT)
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", "0 -80 " + WIDTH * 1.5 + " " + HEIGHT*0.5)
  .classed("svg-content", true);

const path = d3
  .geoPath()
  .projection(d3.geoMercator()
    .center([4.6, 46.5])
    .scale(2600)
    .translate([WIDTH / 2, HEIGHT / 2]));

var g = svg.append("g");

const dbRef = firebase.database().ref();

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

    dbRef.child('province_names').once('value').then(function (snapshot) {
        g.selectAll("path")
            .attr("fill", function (d) {
                if (mapObj[d.properties.ID].dataname)
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
