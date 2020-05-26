var dataCache;
//const dbRef = firebase.database().ref();

function handleClick(centered, d){
  if(centered == d){
    document.getElementById("prov-name").innerHTML = mapObj[d.properties.ID].realname;
    document.getElementById("prov-teaser").innerHTML = mapObj[d.properties.ID].realname + " produces the following varieties of wine: ";
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
    document.getElementById("prov-name").innerHTML = "Provinces";
    document.getElementById("prov-teaser").innerHTML = "Click on a wine province to see the varieties of wine produced.";
  }
}

function to_search_page(event) {
  window.location.href = encodeURI("searchengine.html?" + "variety=" + this.innerText);
};


function renderVarieties(d){
  var dataname = mapObj[d.properties.ID].dataname
  var varieties = dataCache.filter(
                    function(item){
                        return item.province == dataname;
                    });

  document.getElementById("varietyTable").innerHTML =
  "<tr><th>Varieties</th><th>Regions</th></tr>"
  for (i in varieties) {
    var v = varieties[i];
    document.getElementById("varietyTable").innerHTML +=
      "<tr><td><a class='variety_name' onclick='javascript:to_search_page.call(this, event);'>"
      + v.variety + "</a></td><td>" + v.regions + "</th></tr>";
  }
}
