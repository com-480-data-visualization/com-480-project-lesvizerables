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