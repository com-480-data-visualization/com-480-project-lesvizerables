
const dbRef = firebase.database().ref();

function getUrlVars() {
    var vars = [], hash;
    // Get arguments from url
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

//Extract the variety if there exists one
if(allVars) {
  var variety = "";
  // Handle if variety includes several words
  var hashes = allVars.variety.split('%20');
  for(var i = 0; i < hashes.length; i++) {
    variety += hashes[i];
    if(i < hashes.length) variety += " ";
  }
  // Add variety to search query and show results
}
else {
  // Otherwise show search engine without any input
}

// Sets the options of the dropdown menu and once an alternative is selected, the text field is changed
function edit_value(event) {
  document.getElementById("prov_input").value = this.innerText;
  document.getElementById("prov_input").style = "color:black;"
};

dbRef.child('province_names').once('value').then(function (snapshot) {
  dataCache = snapshot.val();

  for (obj in dataCache) {
    var newcontent = document.createElement('div');
    newcontent.innerHTML = "<a class='dropdown_ele' onclick='javascript:edit_value.call(this, event);'>"+ dataCache[obj] + "</a>";
    document.getElementById("province_dropfield").appendChild(newcontent.firstChild);
  }
});
