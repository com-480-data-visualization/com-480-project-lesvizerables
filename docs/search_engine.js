
const dbRef = firebase.database().ref();

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
