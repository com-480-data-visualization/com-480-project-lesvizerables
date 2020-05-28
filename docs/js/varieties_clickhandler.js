// handling of actions done on the varieties page

var dataCache;

// show table displaying varieties and regions
function showTable(show){
    var tbl = document.getElementById("varietyTable");
    if(show){
        tbl.style.visibility = "visible"
    }
    else{
        tbl.style.visibility = "collapse"
    }
}

// handling changing information, showing table and highlighting barplot when province is selected
function handleClick(centered, d){
  if(centered == d){
    document.getElementById("prov-name").innerHTML = mapObj[d.properties.ID].realname;
    document.getElementById("prov-teaser").innerHTML =
      "Scroll down to see the varieties that are produced in " + mapObj[d.properties.ID].realname + ".";
    //document.getElementById("page-instruction").innerHTML = "The varieties are sorted such that the most common variety is at the top.";

    showTable(true);
    highlightBar(mapObj[centered.properties.ID].realname);
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
  // reset to neutral if province unselected
  else{
    showTable(false);
    document.getElementById("prov-name").innerHTML = "Provinces";
    document.getElementById("prov-teaser").innerHTML = "Click on a wine province to see the varieties of wine produced.";
    removeHighlight();
  }
}

// highlight bar in barplot if province on map hovered
function handleHover(centered, d){
    mediumlightBar(mapObj[d.properties.ID].realname);
}

// remove highlight of bar in barplot if province on map not hovered
function handleOutHover(centered, d){
    if(centered){
        mediumlightBar(mapObj[centered.properties.ID].realname);
    }
    else{
        removeHighlight();
    }
}

// action that carries variety picked as input in search engine
function to_search_page(event) {
  window.location.href = encodeURI("searchengine.html?" + "variety=" + this.innerText);
};

// get the belonging varieties and regions data for a selected province
function renderVarieties(d){
  var dataname = mapObj[d.properties.ID].dataname;
  var varieties = dataCache.filter(
                    function(item){
                        return item.province == dataname;
                    });

  document.getElementById("varietyTable").innerHTML =
  "<tr><th>VARIETIES</th><th>REGIONS</th></tr>"
  for (i in varieties) {
    var v = varieties[i];
    document.getElementById("varietyTable").innerHTML +=
      "<tr><td><a class='link' onclick='javascript:to_search_page.call(this, event);'>"
      + v.variety + "</a></td><td>" + v.regions.filter(Boolean).join(",  ") + "</th></tr>";
  }
}
