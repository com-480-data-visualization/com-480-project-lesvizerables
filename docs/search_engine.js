
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
      if(i < hashes.length) variety += " ";
    }
    variety = decodeURI(variety);
    // Add variety to search query and show results
    document.getElementById("var_input").value = variety;
    document.getElementById("var_input").style = "color:black;"

    // Show results
    document.getElementById("searchbtn").click();
  }
  // Load the dropdown values
  load_dropdowns();

};

// Loading the dropdown alternatives
function load_dropdowns() {

  // Sets the options of the province dropdown menu
  dbRef.child('province_names').once('value').then(function (snapshot) {
    dataCache = snapshot.val();

    for (obj in dataCache) {
      var newcontent = document.createElement('div');
      newcontent.innerHTML = "<a class='dropdown_ele' onclick='javascript:edit_prov_val.call(this, event);'>"+ dataCache[obj] + "</a>";
      document.getElementById("province_dropfield").appendChild(newcontent.firstChild);
    }
  });


  // Sets the options of the regions dropdown menu
  dbRef.child('province_info').once('value').then(function (snapshot) {
    dataCache = snapshot.val();

    for (obj in dataCache) {
      //console.log(dataCache[obj]);
      var province;

      if(document.getElementById("prov_input").value)
        province = document.getElementById("prov_input").value;

      //console.log(province);
      //var newcontent = document.createElement('div');
      //newcontent.innerHTML = "<a class='dropdown_ele' onclick='javascript:edit_prov_val.call(this, event);'>"+ dataCache[obj].variety + "</a>";
      //document.getElementById("variety_dropfield").appendChild(newcontent.firstChild);
    }
  });

  // Sets the options of the varieties dropdown menu
  dbRef.child('varieties_info').once('value').then(function (snapshot) {
    dataCache = snapshot.val();

    for (obj in dataCache) {
      var newcontent = document.createElement('div');
      newcontent.innerHTML = "<a class='dropdown_ele' onclick='javascript:edit_prov_val.call(this, event);'>"+ dataCache[obj].variety + "</a>";
      document.getElementById("variety_dropfield").appendChild(newcontent.firstChild);
    }
  });

};

//Change province text field when alternative is selected
function edit_prov_val(event) {
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
