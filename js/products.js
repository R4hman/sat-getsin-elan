// const fetchDataWithQuery = async function (query) {
//   const data = await fetch("http://localhost/products");
//   const res = await data.json();
//   console.log(res);
// };

window.addEventListener("DOMContentLoaded", async () => {
  let urlId = window.location.search;
  console.log(urlId.slice(7));
  console.log(urlId);

  try {
    const response = await fetch(`http://localhost:3000/products/`);
    if (response.status >= 200 && response.status <= 299) {
      const product = await response.json();
      // console.log(product[0]);
      console.log(product);

      const items = product.filter((item) => {
        return item.productName.toLowerCase().trim().includes(urlId.slice(7));
      });

      items.forEach((item) => {
        console.log(item);
        const {
          images,
          id,
          description: desc,
          city,
          price,
          date,
          productName,
        } = item;
        const img = JSON.parse(images)[0].url;
        const html = `
        <div class="premium-card">
        <a href="single-adv.html?id=${id}">
        <div class="premium-card--side card-side--front">
          <div class="card-img--container">
            <img src="${img}" alt="" />
           
          </div>
          <div class="premium-card--bottom">
            <h3>${productName}</h3>
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
            <img src="img/crown.png" alt="" />
            <span class="card-icon">
            <svg class="icon">
              <use xlink:href="img/sprite.svg#icon-heart"></use>
            </svg>
          </span>
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

        document
          .querySelector(".search-lists")
          .insertAdjacentHTML("afterbegin", html);
      });

      //   console.log("product not availanle");
      // document.querySelector(".section-single-adv .container").innerHTML = `
      //   <div class="not-found-msg">
      //     <h3 class="error">Bu sorğu ilə əlaqəli nəticə tapılmadı.</h3>
      //     <a href="index.html" class="btn">
      //       Ana səhifə

      //     </a>
      //   </div>
      // `;

      //   const {
      //     city,
      //     date,
      //     description,
      //     email,
      //     forward,
      //     fullName,
      //     id,
      //     images,
      //     phoneNumber,
      //     premium,
      //     price,
      //     productName,
      //     secondHand,
      //     subCategory,
      //     url,
      //     vip,
      //     wpNumber,
      //   } = product[0];

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
  //   loading.style.display = "none";
});
