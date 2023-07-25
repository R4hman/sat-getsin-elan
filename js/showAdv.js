function showAdv(response, el, key) {
  el.innerHTML = " ";
  let res;
  // let data;
  // if (localStorage.getItem("products")) {
  //   data = JSON.parse(localStorage.getItem("products"));
  // } else {
  //   data = response;
  // }
  // console.log(data);
  // const products = response.forEach((product) =>
  //   console.log(product.premium === true)
  // );
  const premiums = response.filter((product) => product.premium === true);
  const vips = response.filter((product) => product.vip === true);
  const latest = response.filter((product) => product.forward === true);

  if (key === "premium") {
    res = premiums;
  } else if (key === "vip") {
    res = vips;
  } else if (key === "forward") {
    res = latest;
  } else {
    res = response;
  }

  console.log(res);

  //   console.log(products);
  res.forEach((r) => {
    const { date, images, description, city, price, id } = r;
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

    el.insertAdjacentHTML("afterbegin", html);
  });
}

export { showAdv };
