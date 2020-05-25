
function toggleHammenu() {
  let menu = document.querySelector(".ham-menu");
  menu.classList.toggle("toggleMenu");

  let icon = document.querySelector(".nav-icon");
  icon.classList.toggle("toggleIcon");
}

function toggleDropdown(a) {
  a.parentNode.getElementsByClassName("dropdown-content")[0].classList.toggle("show");
    //document.getElementById("searchProvince").classList.toggle(".drop-province show");
    //document.getElementById("searchRegion").classList.toggle(".drop-region show");
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

function filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myinput");
  filter = input.value.toUpperCase();
  div = document.getElementById("dropfield");
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
