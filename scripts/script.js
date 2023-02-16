
var clickcount= 0;
const button = document.getElementById("like");
const textHolder = document.getElementById("count");
textHolder.innerHTML = clickcount;


button.addEventListener("click", function() {
    if (typeof(Storage) !== "undefined") {
      if (localStorage.clickcount) {
        localStorage.clickcount = Number(localStorage.clickcount)+1;
      } else {
        localStorage.clickcount = 1;
      }
      textHolder.innerHTML = localStorage.clickcount;
    } 
  }

);
