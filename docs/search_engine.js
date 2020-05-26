
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
        }
      }
    });
  }
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

  if(variety){
    //
  }
  else if(province && variety) {
    //
  }
  else {
    dbRef.child('province_info').once('value').then(function (snapshot) {
      dataCache = snapshot.val();
      var regions;

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

// Sets the options of the varieties dropdown menu
function set_var_dropdown(province, region) {
  document.getElementById("var_input").value = "";

  // If province already entered, show only regions in chosen province
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
  else if (region) {
    // Need new df?
  }
  // If province not entered, show all regions
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
  var price = document.getElementById("price_input").value;
  var points = document.getElementById("points_input").value;

  // Check for input and do something with input
  console.log('button clicked');
};
