// functions for handling dropdown objects

// open and hide dropdown from hamburger menu
function toggleHammenu() {
  let menu = document.querySelector(".ham-menu");
  menu.classList.toggle("toggleMenu");

  // activate animation of icon in hamburger menu
  let icon = document.querySelector(".nav-icon");
  icon.classList.toggle("toggleIcon");
}

// open and hide dropdown for input dropfields and info dropfield (search engine page)
function toggleDropdown(a) {
  a.parentNode.getElementsByClassName("dropdown-content")[0].classList.toggle("show");

  // close dropdowns if other dropdown element selected
  var dropdowns = document.getElementsByClassName("dropdown-content");
  var i;
  for (i = 0; i < dropdowns.length; i++) {
    var openDropdown = dropdowns[i];
    if (a.nextElementSibling != openDropdown && openDropdown.classList.contains("show")) {
      openDropdown.classList.remove("show");
    }
  }
}

// close dropdowns if screen clicked outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropfield')) {

  var dropdowns = document.getElementsByClassName("dropdown-content");
  var i;
  for (i = 0; i < dropdowns.length; i++) {
    var openDropdown = dropdowns[i];
    if (openDropdown.classList.contains('show')) {
      openDropdown.classList.remove('show');
      }
    }
  }
}

// filter province input field to match what is typed
function filterProvince() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("prov_input");
  filter = input.value.toUpperCase();
  div = document.getElementById("province_dropfield");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

// filter region input field to match what is typed
function filterRegion() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("reg_input");
  filter = input.value.toUpperCase();
  div = document.getElementById("region_dropfield");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

// filter variety input field to match what is typed
function filterVariety() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("var_input");
  filter = input.value.toUpperCase();
  div = document.getElementById("variety_dropfield");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}
