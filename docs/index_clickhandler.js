var dataCache;

function handleClick(centered, d){
  if(centered == d){
    document.getElementById("prov-name").innerHTML = mapObj[d.properties.ID].realname;
    document.getElementById("prov-teaser").innerHTML = mapObj[d.properties.ID].realname + " has the following statistics: ";

    if(dataCache){
      renderStatistics(d);
    }
    else{
      dbRef.child('province_info').once('value').then(function (snapshot) {
        dataCache = snapshot.val();
        renderStatistics(d);
      });
    }
  }
  else{
    document.getElementById("prov-name").innerHTML = "Provinces";
    document.getElementById("prov-teaser").innerHTML = "Click on a wine province to get information about it.";
    document.getElementById("prov-info").innerHTML = "";
    document.getElementById("prov-funfact").innerHTML = "";
  }
}

function renderStatistics(d){
   for (obj in dataCache) {
     if(dataCache[obj].province == mapObj[d.properties.ID].dataname){
       var p = dataCache[obj];
       document.getElementById("prov-info").innerHTML =
         "<b>Number of varieties: </b>" + p.variety +
         "<br/><b>Number of regions: </b>" + p.region +
         "<br/><b>Average price of wines: </b>" + Math.round(p.price) +
         " €<br/><b>Average points of wines: </b>" + Math.round(p.points) + "/100";
       if(funfacts[d.properties.ID])
         document.getElementById("prov-funfact").innerHTML = "<b>Fun fact: </b>" + funfacts[d.properties.ID];
       else
         document.getElementById("prov-funfact").innerHTML = "";

       break;
     }
   }
}