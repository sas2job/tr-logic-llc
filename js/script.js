var header = document.querySelector(".header");
var aside = document.querySelector(".main__aside");

var stickAside = function (item) {
  if (window.pageYOffset > header.offsetHeight) {
    var itemCoor = item.getBoundingClientRect();
    item.setAttribute("style", "position: fixed; top: " + header.offsetHeight + "px; left: " + itemCoor.left + "px;");
  } else {
    item.removeAttribute("style");
  };
};

window.addEventListener("scroll", function () {
  stickAside(aside);
});