const lastAdvContainer = document.querySelector(
  ".section-last-adv .premium-lists"
);
// let store;

const fetchData = async (url) => {
  const data = await fetch(url);
  // console.log(data);
  const response = await data.json();
  // console.log(response);
  // console.log(response);

  showAdv(response);
  // store = response;
  // console.log(store);
  searchValue(response);
  // setStore(response);
};

// function showAdvFromLocal(item) {
//   item = JSON.parse(localStorage.getItem("products"));
//   console.log(item);

//   showAdv(item);
// }

// showAdvFromLocal();

function showAdv(response) {
  lastAdvContainer.innerHTML = " ";
  // let data;
  // if (localStorage.getItem("products")) {
  //   data = JSON.parse(localStorage.getItem("products"));
  // } else {
  //   data = response;
  // }
  // console.log(data);
  response.forEach((res) => {
    const { date, images, description, city, price, id } = res;
    const img = JSON.parse(images);
    // console.log(img[0].url);
    // console.log(images);
    const html = `
    <div class="premium-card data-id="${id}">
    <a href="single-adv.html?id=${id}">
    
    <div class="premium-card--side card-side--front">
      <div class="card-img--container">
        <img src="${img[0].url}" alt="" />
       
      </div>
      <div class="premium-card--bottom">
        <h3>${description}</h3>
        <div class="card-info">
          <svg class="icon">
            <use xlink:href="img/sprite.svg#icon-location"></use>
          </svg>
          <span>${city}</span>
        </div>
        <div class="card-info">
          <svg class="icon">
            <use xlink:href="img/sprite.svg#icon-clock"></use>
          </svg>
          <span>${date}</span>
        </div>

        <span class="card-price">${price} ₼</span>
      </div>
    </div>
    <div class="premium-card--side card-side--back">

      <div class="card-img--container img-back">
       <span class="card-icon">
        <svg class="icon">
         <use xlink:href="img/sprite.svg#icon-heart"></use>
       </svg>
       </span>
     
        <img src="img/crown.png" alt="" />
      </div>
      <div class="card-info">
        <h2>Elanını premium et</h2>
        <div><span>3 ₼</span> / 5 gün</div>
        <a href="" class="premium-btn"> Premium et </a>
      </div>
    </div>
    </a>
  </div>
    `;

    lastAdvContainer.insertAdjacentHTML("afterbegin", html);
  });
}

const setStore = async function () {
  // console.log(store);
  localStorage.setItem("store", store);
};

// setStore();

const form = document.querySelector(".header-search--form");
const mainSearchInput = document.querySelector("#search-input");
const relatedResults = document.querySelector(".related-results");

function searchValue(data) {
  // console.log(form);
  form.addEventListener("keyup", function () {
    if (relatedResults.children.length > 1) {
      relatedResults.children[1].remove();
    }
    const value = mainSearchInput.value.trim();

    // console.log(data);
    let response = data.filter((db) => {
      // console.log(db.productName);
      return db.productName.toLowerCase().trim().includes(value.toLowerCase());
    });
    // console.log(response);
    if (response.length === data.length) {
      response = [];
    }
    if (response.length > 0) {
      const listItems = document.createElement("ul");
      listItems.classList.add("result-lists");
      response.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.classList.add("result-list");
        // const highlight = (value.style.color = "red");
        // const val = item.productName.split(" ").find((el) => el === value);
        // console.log(val);
        const index = item.productName.toLowerCase().indexOf(value);
        // console.log(item.productName.toLowerCase().indexOf(value));
        // console.log(item.productName.slice(index, value.length));
        listItem.innerHTML = `
        <a class="highlight-val" href="http://127.0.0.1:8080/products.html?query=${value}">${item.productName}</a>
        `;

        listItems.appendChild(listItem);
      });
      relatedResults.appendChild(listItems);
    }
  });
}

// const funcTest = function () {
//   alert("function test");
//   console.log("fntest");
// };

function closeInputContainer() {}

function Init() {
  fetchData("http://localhost:3000/products");
  document.querySelector(".input-result-container").style.display = "none";
}

window.addEventListener("DOMContentLoaded", Init);

// export { showAdv };
