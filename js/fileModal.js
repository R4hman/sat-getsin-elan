// VIDEO IMG MODAL
const advFiles = document.querySelectorAll(
  ".single-adv_file-container .adv-file"
);

// let lists = [];

const featureBtns = document.querySelector(".feature-buttons");
const forwardBtn = document.querySelector("fieldset");
const vipBtn = document.querySelector(".vip-btn");
const premBtn = document.querySelector(".prem-btn");

const productFeatures = document.querySelectorAll(
  ".product-features_first span"
);

const featureContents = document.querySelectorAll(".product-toggle");

// MAKE FORWARD, VIP, PREMIUM BTN FUNCTIONS

// window.addEventListener("click", async (e) => {
//   e.preventDefault();
//   e.stopPropagation();
//   const el = e.target;
//   let obj;
//   if (el.closest("fieldset")) {
//     console.log("fieldset");
//   } else if (el.closest(".vip-btn")) {
//     console.log("vip-btn");
//   } else if (el.closest(".prem-btn")) {
//     console.log("prem-btn");
//   }
//   // if (el.closest("fieldset")) {
//   //   console.log(lists);
//   // }
//   el.closest("fieldset")
//     ? (obj = { forward: true })
//     : el.closest(".vip-btn")
//     ? (obj = { vip: true })
//     : el.closest(".prem-btn")
//     ? (obj = { premium: true })
//     : null;
//   const urlId = window.location.search.slice(4);
//   console.log(urlId);
//   try {
//     const response = await fetch(`http://localhost:3000/products/${urlId}`, {
//       method: "PATCH",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(obj),
//     })
//       .then((response) => response.json())
//       .then((data) => console.log(data));
//     // if (response.status >= 200 && response.status <= 299) {
//     //   const product = await response.json();

//     //   //  `;
//     // } else {
//     //   console.log(response.status, response.statusText);
//     // }
//   } catch (error) {
//     console.log(error);
//   }
// });

// IT IS A FUNCTION ACCEPT TYPE and CHANGES PROPERTY IN DATABASE BASED ON PROPERTY BY PATCH METHOD
const patchData = async function (type) {
  const urlId = window.location.search.slice(4);
  console.log(urlId);
  try {
    const response = await fetch(`http://localhost:3000/products/${urlId}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        [type]: "true",
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    // if (response.status >= 200 && response.status <= 299) {
    //   const product = await response.json();

    //   //  `;
    // } else {
    //   console.log(response.status, response.statusText);
    // }
  } catch (error) {
    console.log(error);
  }
};

// MAKING PRODUCT VIP
vipBtn.addEventListener("click", async function (e) {
  e.preventDefault();
  console.log("vip btn clicked");

  patchData("vip");
  // try {
  //   const response = await fetch(`http://localhost:3000/products/${urlId}`, {
  //     method: "PATCH",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ vip: "true" }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => console.log(data));
  //   // if (response.status >= 200 && response.status <= 299) {
  //   //   const product = await response.json();

  //   //   //  `;
  //   // } else {
  //   //   console.log(response.status, response.statusText);
  //   // }
  // } catch (error) {
  //   console.log(error);
  // }
});
//MAKING PRODUCT PREMIUM
premBtn.addEventListener("click", function (e) {
  e.preventDefault();

  patchData("premium");
});
// MAKING PRODUCT TO BE SEEN ON FORWARD BY DOING "FORWARD" PROPERTY TRUE
forwardBtn.addEventListener("click", function (e) {
  e.preventDefault();

  patchData("forward");
});

//CLOSING FILES MODAL
document.querySelector(".popup-cover span").onclick = () => {
  document.querySelector(".file-popup").style.display = "none";
  document.querySelector(" .show-popup-file-container iframe").src = "";

  // document.querySelector(" .show-popup-file-container").innerHTML = "";
};

advFiles.forEach((file) => {
  let el;
  file.addEventListener("click", (e) => {
    e.stopPropagation();
    if (e.target.tagName === "DIV") {
      el = e.target.parentElement.children[1];
      document.querySelector(" .show-popup-file-container img").style.display =
        "none";
      document.querySelector(
        " .show-popup-file-container iframe"
      ).style.display = "block";
      document.querySelector(" .show-popup-file-container iframe").src = el.src;
    } else {
      el = e.target;
      document.querySelector(
        " .show-popup-file-container iframe"
      ).style.display = "none";
      document.querySelector(" .show-popup-file-container img").style.display =
        "block";
      document.querySelector(" .show-popup-file-container img").src = el.src;
    }

    document.querySelector(".file-popup").style.display = "block";
  });
});

// TOGGLE  PRODUCT FEATURE

// console.log(featureContents);

productFeatures.forEach((feature) => {
  feature.addEventListener("click", () => {
    document
      .querySelector(".feature-active")
      ?.classList.remove("feature-active");
    feature.classList.add("feature-active");
    featureContents.forEach((content) => {
      content.style.display = "none";
    });
    featureContents[feature.dataset.id - 1].style.display = "block";
  });
});

const loading = document.querySelector(".loading");
const mainImg = document.querySelector(".single-adv_main-img-container img");
const productVideo = document.querySelector(".iframe-container iframe");
const priceSpan = document.querySelector(".main-img_share span");
const secondImg = document.querySelectorAll(".single-adv_second_img");
const productTitle = document.querySelector(".single-adv_features h1");
const advNumber = document.querySelector(".adv-number");
const advDate = document.querySelector(".adv-date");
const advSeen = document.querySelector(".adv-seen");
const owner = document.querySelector(".owner");
const sellerPhone = document.querySelector(".seller-phone");
const sellerWp = document.querySelector(".seller-wp");
const mainFeature = document.querySelector(".product-toggle");
const mainFeatureTitle = document.querySelector(".product-toggle h1");
const mainFeatureLists = document.querySelector(".product-toggle ul ");
const mainFeatureList = document.querySelector(".product-toggle ul li");
const productCity = document.querySelectorAll(".product-toggle_first span");
const productSituation = document.querySelectorAll(
  ".product-toggle_second span"
);

// console.log("video", productVideo);
// console.log("price", priceSpan);
// console.log("secondImg", secondImg);
// console.log("productTitle", productTitle);
// console.log("advNumber", advNumber);
// console.log("advSeen", advSeen);
// console.log("advDate", advDate);
// console.log("owner", owner);
// console.log("sellerPhone", sellerPhone);
// console.log("sellerWp", sellerWp);
// console.log("mainFeature", mainFeature);
// console.log("mainFeatureTitle", mainFeatureTitle);
// console.log("mainFeatureLists", mainFeatureLists);
// console.log("mainFeatureList", mainFeatureList);
// console.log("productCity", productCity);
// console.log("productSituation", productSituation[1].innerText);

window.addEventListener(
  "DOMContentLoaded",
  async () => {
    let urlId = window.location.search;
    // console.log(urlId.slice(4));
    // console.log(urlId);

    try {
      const response = await fetch(`http://localhost:3000/products/${urlId}`);
      if (response.status >= 200 && response.status <= 299) {
        const product = await response.json();

        // console.log(product[0]);
        // console.log(product);
        if (product.length !== 1) {
          // console.log("product not availanle");
          document.querySelector(".section-single-adv .container").innerHTML = `
          <div class="not-found-msg">
            <h3 class="error">Bu sorğu ilə əlaqəli nəticə tapılmadı.</h3>
            <a href="index.html" class="btn">
              Ana səhifə
            
            </a>
          </div>
        `;
        }
        const {
          city,
          date,
          description,
          email,
          forward,
          fullName,
          id,
          images,
          phoneNumber,
          premium,
          price,
          productName,
          secondHand,
          subCategory,
          url,
          vip,
          wpNumber,
        } = product[0];
        // console.log(url);
        priceSpan.innerText = price;
        productTitle;
        owner.innerText = fullName;
        advDate.innerText = date;
        sellerPhone.innerText = phoneNumber;
        sellerWp.innerText = wpNumber;

        mainImg.src = JSON.parse(images)[0].url;
        // console.log(secondImg[1].src);
        // secondImg.forEach((img, i) => {
        //   img.src = JSON.parse(images)[i + 1].url;
        // });
        // console.log("images", JSON.parse(images));
        secondImg[0].src = JSON.parse(images)[1].url;
        secondImg[1].src = JSON.parse(images)[0].url;
        secondImg[2].src = JSON.parse(images)[2].url;

        // console.log(secondImg[2].classList);
        mainFeatureTitle.innerText = description;
        productTitle.innerText = productName;
        productCity[1].innerText = city;
        productSituation[1].innerText = secondHand;
        // console.log(productVideo);
        // console.log(url);
        productVideo.setAttribute("src", url);
        // console.log(productVideo);

        //   centerDOM.innerHTML = `
        // <div>
        // <h3 class="error">sorry, something went wrong</h3>
        // <a href="index.html" class="btn">back home</a>
        // </div>
        //  `;
      } else {
        console.log(response.status, response.statusText);
        // document.querySelector(".loading").innerHTML = `
        //   <div>
        //     <h3 class="error">sorry, something went wrong</h3>
        //     <a href="index.html" class="btn">
        //       back home
        //     </a>
        //   </div>
        // `;
      }
    } catch (error) {
      console.log(error);
    }
    loading.style.display = "none";
  }
  // { passive: true }
);
