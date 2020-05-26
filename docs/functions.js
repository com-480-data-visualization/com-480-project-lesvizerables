
function toggleHammenu() {
  let menu = document.querySelector(".ham-menu");
  menu.classList.toggle("toggleMenu");

  let icon = document.querySelector(".nav-icon");
  icon.classList.toggle("toggleIcon");
}

function toggleDropdown(a) {
  a.parentNode.getElementsByClassName("dropdown-content")[0].classList.toggle("show");

  var dropdowns = document.getElementsByClassName("dropdown-content");
  var i;
  for (i = 0; i < dropdowns.length; i++) {
    var openDropdown = dropdowns[i];
    if (a.nextElementSibling.id != openDropdown.id && openDropdown.classList.contains("show")) {
      openDropdown.classList.remove("show");
    }
  }
}

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
