"use strict";
const imgInput = document.getElementById("img-file");
const uploadImgContainer = document.querySelector(".image-container");
const advForm = document.querySelector(".new-adv--form");
const catVal = document.querySelector(".cat-value");
const advTextarea = document.querySelector("#description");
const selectSecondHand = document.querySelector(".select-secondhand");
const selectPhones = document.querySelectorAll(
  ".new-adv--personalInfo_phone select"
);

let images = [];
// UPLOAD IMAGE FUNCTIONALITY
imgInput.addEventListener("change", function () {
  // const img = this.files;
  // console.log(img);
  // for (let i = 0; i < img.length; i++) {
  //   if (images.length === 5) {
  //     alert("You have enough selected images");
  //     return;
  //   }

  //   images.push({
  //     name: img[i].name,
  //     url: URL.createObjectURL(img[i]),
  //     files: img[i],
  //   });
  // }

  const fr = new FileReader();
  // const fakeImgCont = [];

  fr.readAsDataURL(this.files[0]);
  fr.addEventListener("load", () => {
    const url = fr.result;
    // console.log(url);
    images.push({
      url,
    });
    console.log(images);
    displayUploadedImages(images);
    // fakeImgCont.push(url);
    // console.log(fakeImgCont);
  });
});

function displayUploadedImages(pics) {
  console.log(pics);
  let image = "";
  console.log(images);
  pics.forEach((img, i) => {
    console.log(img.url);
    image = `
        <div class="upload-img" data-id="${i}">
              <img src="${img.url}" alt="" />
              <span onclick="deleteImg(${pics.indexOf(img)}
      
      )">&times;</span>
            </div>
    `;
  });

  uploadImgContainer.insertAdjacentHTML("afterbegin", image);

  //   return image;
}

function deleteImg(img) {
  console.log("delete clicked", img);
  images.splice(img, 1);
  document.querySelectorAll(".upload-img").forEach((el) => {
    if (+el.dataset.id === img) {
      el.remove();
    }
  });

  console.log(images);
}

// ADV FORM SUBMITTION
const advButton = document.querySelector(".adv-btn");

// advForm.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const data = new FormData(advForm);
//   //   console.log(selectSecondHand.options[selectSecondHand.selectedIndex].text);
//   data.append(
//     "second-hand",
//     selectSecondHand.options[selectSecondHand.selectedIndex].text
//   );
//   data.append("cat-value", catVal.innerHTML.trim());
//   data.append("product-info", advTextarea.value);
//   for (const [name, value] of data) {
//     console.log(name + ":" + value);
//   }

//   advForm.reset();
// });

advButton.addEventListener("click", (e) => {
  e.preventDefault();
  const data = new FormData(advForm);
  let phoneInput =
    selectPhones[0].options[selectPhones[0].selectedIndex].text +
    data.get("phoneNumber");
  console.log(phoneInput);
  let wpInput =
    selectPhones[1].options[selectPhones[1].selectedIndex].text +
    data.get("wpNumber");

  console.log(phoneInput, wpInput);
  data.append("wpNumber", wpInput);
  data.append("phoneNumber", phoneInput);
  data.append(
    "secondHand",
    selectSecondHand.options[selectSecondHand.selectedIndex].text
  );
  data.append("category", catVal.innerHTML.trim());
  data.append("description", advTextarea.value);
  data.append("images", JSON.stringify(images));
  data.append("forward", false);
  data.append("vip", false);
  data.append("premium", false);
  data.append("date", new Date().toLocaleDateString("en-GB"));
  for (const [name, value] of data) {
    console.log(name + ":" + value);
  }

  const formData = Object.fromEntries(data);
  fetch("http://localhost:3000/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((d) => console.log(d))
    .catch((err) => console.log(err));
  advForm.reset();
});

// GET DATA FROM DATA.JSON
const imgShow = document.querySelector(".img-show");
const testCont = document.querySelector(".test-imgCont");

const getData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  // console.log(data[10].images);
  // console.log(JSON.parse(data[1].images)[0].url);
  // imgShow.src = JSON.parse(data[1].images)[0].url;
  // JSON.parse(data[7].images).forEach((img) => {
  //   console.log(img.url);
  //   imgShow.src = img.url;

  // const pic = document.createElement("img");
  // const newImg = new Image();
  // newImg.src = URL.createObjectURL(img.url);
  // // URL.revokeObjectURL(pic.src);
  // document.body.appendChild(newImg);

  // blobToImage(img.url);
  // });
};

// const blobToImage = () => {
//   console.log(blob);
//   const blob =
//     "blob:http://127.0.0.1:8080/9a52aa0e-f860-4eb5-a3d1-98e488e58d95";
//   const imageUrl = URL.createObjectURL(blob);
//   // const img = document.querySelector('img');
//   imgShow.addEventListener("load", () => URL.revokeObjectURL(imageUrl));
//   imgShow.src = imageUrl;
//   // document.querySelector('img').src = imageUrl;
// };

getData("http://localhost:3000/products");
