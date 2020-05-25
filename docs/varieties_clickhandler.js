var dataCache;

function handleClick(centered, d){
  if(centered == d){
    document.getElementById("prov-name").innerHTML = mapObj[d.properties.ID].realname;
    document.getElementById("prov-teaser").innerHTML = mapObj[d.properties.ID].realname + " produces the following varieties of wine: ";

    if(dataCache){
      renderVarieties(d);
    }
    else{
      dbRef.child('varieties_info').once('value').then(function (snapshot) {
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
    document.getElementById("varietyTable").innerHTML += "<tr><td>" + v.variety + "</td><td>" + v.region + "</th></tr>";
  }
}
