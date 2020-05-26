var dataCache;
//const dbRef = firebase.database().ref();

function showTable(show){
    var tbl = document.getElementById("varietyTable");
    console.log(tbl.style.display);
    if(show){
        tbl.style.visibility = "visible"
    }
    else{
        tbl.style.visibility = "collapse"
    }
}

function handleClick(centered, d){
  if(centered == d){
    document.getElementById("prov-name").innerHTML = mapObj[d.properties.ID].realname;
    document.getElementById("prov-teaser").innerHTML =
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

function to_search_page(event) {
  window.location.href = encodeURI("searchengine.html?" + "variety=" + this.innerText);
};

function renderVarieties(d){
  var dataname = mapObj[d.properties.ID].dataname;
  var varieties = dataCache.filter(
                    function(item){
                        return item.province == dataname;
                    });

  document.getElementById("varietyTable").innerHTML =
  "<tr><th>Varieties</th><th>Regions</th></tr>"
  for (i in varieties) {
    var v = varieties[i];
    document.getElementById("varietyTable").innerHTML +=
      "<tr><td><a class='link' onclick='javascript:to_search_page.call(this, event);'>"
      + v.variety + "</a></td><td>" + v.regions.filter(Boolean).join(",  ") + "</th></tr>";
  }
}
