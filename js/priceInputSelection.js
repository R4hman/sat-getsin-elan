const priceText = document.querySelector(".price-value");
const priceInputs = document.querySelector(".price-inputs");
const editablePriceCont = document.querySelector(".editable-price-container");

console.log(priceInputs);

priceText.addEventListener("click", () => {
  console.log("test");
  priceInputs.classList.toggle("showPriceInputs");
});

const minInput = document.querySelector(".price-inputs input[name='min']");
const maxInput = document.querySelector(".price-inputs input[name='max']");

const priceCloseTimes = document.querySelector(".price-close");
const editableContent = document.querySelector(".editable-price-content");

console.log(editableContent);

minInput.addEventListener("input", (e) => {
  priceText.style.display = "none";
  editablePriceCont.style.display = "flex";

  console.log(e.target.value);
  console.log(e.target.value === "");

  if (e.target.value === "" && maxInput.value === "") {
    console.log("yes it is empty");
    priceText.style.display = "block";
    editablePriceCont.style.display = "none";
    // priceInputs.classList.remove("showPriceInputs");
  }

  if (e.target.value != "" && maxInput.value === "") {
    editableContent.innerHTML = `
  min ${e.target.value}
  `;
  }

  if (maxInput.value != "" && e.target.value === "") {
    editableContent.innerHTML = `
      max ${maxInput.value}
    `;
  }
  if (maxInput.value != "" && e.target.value != "") {
    editableContent.innerHTML = `
      ${e.target.value}  ${maxInput.value}
    `;
  }
});

maxInput.addEventListener("input", (e) => {
  priceText.style.display = "none";
  editablePriceCont.style.display = "flex";

  if (e.target.value === "" && minInput.value === "") {
    console.log("yes it is empty");
    priceText.style.display = "block";
    editablePriceCont.style.display = "none";
    // priceInputs.classList.remove("showPriceInputs");
  }

  if (e.target.value === " " && minInput.value !== " ") {
    editableContent.innerHTML = `
      min ${minInput.value}
     `;
  }

  if (minInput.value != "") {
    editableContent.innerHTML = `
   ${minInput.value} - ${e.target.value}
  `;
  } else {
    editableContent.innerHTML = `
    max ${e.target.value}
    `;
  }
});

priceCloseTimes.addEventListener("click", () => {
  priceText.style.display = "block";
  editablePriceCont.style.display = "none";
  priceInputs.classList.remove("showPriceInputs");
  minInput.value = "";
  maxInput.value = "";
});
