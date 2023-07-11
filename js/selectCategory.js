"use strict";
const subCat = document.querySelectorAll(".sub-cat");
const catValue = document.querySelector(".cat-value");
const menus = document.querySelector(".menus");
const submenus = document.querySelector(".submenus");
const label = document.querySelector(".cat-navigation label ");

label.addEventListener("click", () => {
  menus.style.display = menus.style.display === "none" ? "block" : "none";
});

subCat.forEach((option, i) => {
  option.addEventListener("click", () => {
    catValue.innerHTML = option.innerHTML;

    // CategoryOptionMenu.classList.remove("active");
    menus.style.display = "none";
  });
});
