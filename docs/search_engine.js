
const dbRef = firebase.database().ref();
var allVars = getUrlVars();

function load_search_engine(){
  //Extract the variety if there exists one
  if(allVars) {
    var variety = "";
    // Handle if variety includes several words
    var hashes = allVars.variety.split('%20');

    for(var i = 0; i < hashes.length; i++) {
      variety += hashes[i];
      if(i < (hashes.length-1)) variety += " ";
    }
    variety = decodeURI(variety);
    // Add variety to search query and show results
    document.getElementById("var_input").value = variety;
    document.getElementById("var_input").style = "color:black;"

    // Show results
    document.getElementById("searchbtn").click();
  }
};

// Loading the dropdown alternatives
function load_dropdowns() {
  var province, region, variety;

  // Reset dropdowns
  document.getElementById("province_dropfield").innerHTML = "";
  document.getElementById("region_dropfield").innerHTML = "";
  document.getElementById("variety_dropfield").innerHTML = "";

  // Get inputs if already set
  if(document.getElementById("prov_input").value)
    province = document.getElementById("prov_input").value;
  if(document.getElementById("reg_input").value)
    region = document.getElementById("reg_input").value;
  if(document.getElementById("var_input").value)
    variety = document.getElementById("var_input").value;

  if(this.id == "prov_input")
    set_prov_dropdown(region, variety);

  if(this.id == "reg_input")
    set_reg_dropdown(province, variety);

  if(this.id == "var_input")
    set_var_dropdown(province, region);
};

// Sets the options of the province dropdown menu
function set_prov_dropdown(region, variety) {
  document.getElementById("prov_input").value = "";
  var provinces;

  // If variety already entered, show only provinces with chosen variety
  if(variety) {
    dbRef.child('varieties_info').once('value').then(function (snapshot) {
      dataCache = snapshot.val();

      for (obj in dataCache) {
        if(dataCache[obj].variety == variety) {
          provinces = dataCache[obj].provinces;

          for(i = 0; i < provinces.length; i++) {
            var newcontent = document.createElement('div');
            newcontent.innerHTML = "<a class='dropdown_ele' onclick='javascript:edit_input_val.call(this, event);'>"+ provinces[i] + "</a>";
            document.getElementById("province_dropfield").appendChild(newcontent.firstChild);
          }
          break;
        }
      }
    });
  }
  // If region already entered, show only province for chosen region
  else if(region) {
    dbRef.child('regions_info').once('value').then(function (snapshot) {
      dataCache = snapshot.val();

      for (obj in dataCache) {
        if(dataCache[obj].region == region) {
          provinces = dataCache[obj].provinces;
          var newcontent = document.createElement('div');
          newcontent.innerHTML = "<a class='dropdown_ele' onclick='javascript:edit_input_val.call(this, event);'>"+ provinces[0] + "</a>";
          document.getElementById("province_dropfield").appendChild(newcontent.firstChild);
        }
      }
    });
  }
  // If no values entered, show all provinces
  else {
    dbRef.child('province_names').once('value').then(function (snapshot) {
      dataCache = snapshot.val();

      for (obj in dataCache) {
        var newcontent = document.createElement('div');
        newcontent.innerHTML = "<a class='dropdown_ele' onclick='javascript:edit_input_val.call(this, event);'>"+ dataCache[obj] + "</a>";
        document.getElementById("province_dropfield").appendChild(newcontent.firstChild);
      }
    });
  }
};

// Sets the options of the regions dropdown menu
function set_reg_dropdown(province, variety) {
  document.getElementById("reg_input").value = "";
  var regions;

  // If province & variety already entered, show regions that fit with entered values
  if(province && variety) {
    dbRef.child('prov_varieties').once('value').then(function (snapshot) {
      dataCache = snapshot.val();

      for(obj in dataCache) {
        if(dataCache[obj].province == province && dataCache[obj].variety == variety) {
          regions = dataCache[obj].regions;

          for(i = 0; i < regions.length; i++) {
            var newcontent = document.createElement('div');
            newcontent.innerHTML = "<a class='dropdown_ele' onclick='javascript:edit_input_val.call(this, event);'>"+ regions[i] + "</a>";
            document.getElementById("region_dropfield").appendChild(newcontent.firstChild);
          }
          break;
        }
      }
    });
  }
  // If variety already entered, show only regions with chosen variety
  else if(variety){
    dbRef.child('varieties_info').once('value').then(function (snapshot) {
      dataCache = snapshot.val();

      for(obj in dataCache) {
        if(dataCache[obj].variety == variety){
          regions = dataCache[obj].regions;

          for(i = 0; i < regions.length; i++) {
            var newcontent = document.createElement('div');
            newcontent.innerHTML = "<a class='dropdown_ele' onclick='javascript:edit_input_val.call(this, event);'>"+ regions[i] + "</a>";
            document.getElementById("region_dropfield").appendChild(newcontent.firstChild);
          }
          break;
        }
      }
    });
  }
  else {
    dbRef.child('province_info').once('value').then(function (snapshot) {
      dataCache = snapshot.val();

      for(obj in dataCache) {
        // If province already entered, show only regions in chosen province
        if(province){
          if(dataCache[obj].province == province) {
            regions = dataCache[obj].regions;
            for(i = 0; i < regions.length; i++) {
              var newcontent = document.createElement('div');
              newcontent.innerHTML = "<a class='dropdown_ele' onclick='javascript:edit_input_val.call(this, event);'>"+ regions[i] + "</a>";
              document.getElementById("region_dropfield").appendChild(newcontent.firstChild);
            }
            break;
          }
        }
        // If nothing entered, show all regions
        else {
          regions = dataCache[obj].regions;
          for(i = 0; i < regions.length; i++) {
            var newcontent = document.createElement('div');
            newcontent.innerHTML = "<a class='dropdown_ele' onclick='javascript:edit_input_val.call(this, event);'>"+ regions[i] + "</a>";
            document.getElementById("region_dropfield").appendChild(newcontent.firstChild);
          }
        }
      }
    });
  }
};

//Sets the options of the varieties dropdown menu
function set_var_dropdown(province, region) {
  document.getElementById("var_input").value = "";
  var varieties;

  //If province already entered, show only regions in chosen province
  if(province){
    dbRef.child('prov_varieties').once('value').then(function (snapshot) {
      dataCache = snapshot.val();

      for (obj in dataCache) {
        if(dataCache[obj].province == province) {
          var newcontent = document.createElement('div');
          newcontent.innerHTML = "<a class='dropdown_ele' onclick='javascript:edit_input_val.call(this, event);'>"+ dataCache[obj].variety + "</a>";
          document.getElementById("variety_dropfield").appendChild(newcontent.firstChild);
        }
      }
    });
  }
  //If region already entered, show only varieties in chosen region
  else if (region) {
    dbRef.child('regions_info').once('value').then(function (snapshot) {
      dataCache = snapshot.val();

      for (obj in dataCache) {
        if(dataCache[obj].region == region) {
          varieties = dataCache[obj].varieties;
          for(var i=0; i < varieties.length; i++) {
            var newcontent = document.createElement('div');
            newcontent.innerHTML = "<a class='dropdown_ele' onclick='javascript:edit_input_val.call(this, event);'>" + varieties[i] + "</a>";
            document.getElementById("variety_dropfield").appendChild(newcontent.firstChild);
          }
        }
      }
    });
  }
  //If province or region not entered, show all varieties
  else {
    dbRef.child('varieties_info').once('value').then(function (snapshot) {
      dataCache = snapshot.val();

      for (obj in dataCache) {
        var newcontent = document.createElement('div');
        newcontent.innerHTML = "<a class='dropdown_ele' onclick='javascript:edit_input_val.call(this, event);'>"+ dataCache[obj].variety + "</a>";
        document.getElementById("variety_dropfield").appendChild(newcontent.firstChild);
      }
    });
  }
};

//Change province text field when alternative is selected from dropdown
function edit_input_val(event) {
  this.parentNode.parentNode.firstElementChild.value = this.innerText;
  this.parentNode.parentNode.firstElementChild.style = "color:black;"
};

//Search for results with textfield inputs
function search_results(event) {
  var province = document.getElementById("prov_input").value;
  var region = document.getElementById("reg_input").value;
  var variety = document.getElementById("var_input").value;
  var price_range = document.getElementById("price_input").value;
  var price = [];

  //Reset former results
  document.getElementById('the_search').innerHTML = "";
  document.getElementById('resulting_statistics').innerHTML = "";
  document.getElementById("explain_results").innerHTML = "";
  document.getElementById("search_results_table").innerHTML = "";
  document.getElementById("search_results_table").innerHTML = "";

  //Turn price range string into array
  if(price_range) {
    var hashes = price_range.split(/[>\s-€]+/, 2);

    for(var i = 0; i < hashes.length; i++) {
      price.push(hashes[i]);
    }
    //If price_range was '< 70€', remove empty first slot
    if(price[0] == "") price.shift();
    console.log(price);
  }
  //Get results
  if((variety && !province && !region && !price_range) || (variety && price_range && !province && !region)) {
    show_variety_results(variety, price_range, price);
  }

  //Show table_results

};

//If a user has searched for only a variety or variety + price, show results
function show_variety_results(variety, price_range, price) {
  document.getElementById('the_search').innerHTML = "You searched for the variety <b>" + variety + "</b>.";

  //Show summary text of variety
  dbRef.child('varieties_info').once('value').then(function (snapshot) {
    dataCache = snapshot.val();

    for(obj in dataCache) {
      if(dataCache[obj].variety == variety) {
        document.getElementById('resulting_statistics').innerHTML = variety + " has the average price " + dataCache[obj].avg_price + "€, " +
          "the average points " + dataCache[obj].avg_points + "/10 and exists in the following provinces: " + dataCache[obj].provinces.join(', ') + ".";
        break;
      }
    }
  });

  //Load table with results
  dbRef.child('raw_data').once('value').then(function (snapshot) {
    dataCache = snapshot.val();
    document.getElementById("explain_results").innerHTML =
      "The following wines correspond to your search query:";
    document.getElementById("search_results_table").innerHTML =
      "<tr><th>PROVINCE</th><th>REGION</th><th>PRICE</th><th>POINTS</th><th>TITLE</th><th>YEAR</th></tr>";

    for(obj in dataCache) {
      if((!price_range && dataCache[obj].variety == variety) ||
        (price_range && price[1] && dataCache[obj].variety == variety && dataCache[obj].price > price[0] && dataCache[obj].price < price[1]) ||
        (price_range && !price[1] && dataCache[obj].variety == variety && dataCache[obj].price > price[0])) {

        document.getElementById("search_results_table").innerHTML +=
          "<tr><td>"+ dataCache[obj].province + "</td><td>" + dataCache[obj].region + "</th><td>" + dataCache[obj].price +
          "</th><td>" + dataCache[obj].points + "</th><td>" + dataCache[obj].title + "</th><td>" + dataCache[obj].year + "</th></tr>";
      }

    }
  });
}
