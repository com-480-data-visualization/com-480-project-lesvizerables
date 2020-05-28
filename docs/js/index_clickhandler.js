// handling click actions of index page

var dataCache;

function handleClick(centered, d){
  // get chosen province, display name and info of that province
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

  // reset back to neutral display if no province selected
  else{
    document.getElementById("prov-name").innerHTML = "Provinces";
    document.getElementById("prov-teaser").innerHTML = "Click on a wine province to get information about it.";
    document.getElementById("prov-info").innerHTML = "";
    document.getElementById("prov-funfact").innerHTML = "";
  }
}

function handleHover(centered, d){

}

function handleOutHover(centered, d){

}

// function that sends user to varieties page if link is clicked
function to_varieties_page(event) {
  window.location.href = "varieties.html?" + "province=" + this.innerText;
};

// get the information about a province to be displayed and style it
function renderStatistics(d){
  for (obj in dataCache) {
    if(dataCache[obj].province == mapObj[d.properties.ID].dataname){
      var p = dataCache[obj];
      document.getElementById("prov-info").innerHTML =
        "<b>Number of varieties: </b>" + p.n_varieties +
        "<br/><b>Number of regions: </b>" + p.n_regions +
        "<br/><b>Average price of wines: </b>" + p.avg_price +
        " €<br/><b>Average points of wines: </b>" + p.avg_points + "/10<br/>" +
        "</br><a class='link' href='varieties.html?province=" + d.properties.ID + "'>See the varieties in this province</a>";

      if(funfacts[d.properties.ID])
        document.getElementById("prov-funfact").innerHTML = "<b>Fun fact: </b>" + funfacts[d.properties.ID];
      else
        document.getElementById("prov-funfact").innerHTML = "";
      break;
    }
  }
}
