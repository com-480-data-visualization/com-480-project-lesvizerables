
const dbRef = firebase.database().ref();

// Function to get arguments from url
function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    // Check if there were arguments
    if (hashes.includes(window.location.href)) return null;
    else {
      for(var i = 0; i < hashes.length; i++) {
          hash = hashes[i].split('=');
          vars.push(hash[0]);
          vars[hash[0]] = hash[1];
      }
      // Return arguments
      return vars;
    }
};

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

};

//Change province text field when alternative is selected
function edit_prov_val(event) {
  document.getElementById("prov_input").value = this.innerText;
  document.getElementById("prov_input").style = "color:black;"
};
