const registerType = document.querySelectorAll(".toggle-register span");

const registerContents = document.querySelectorAll(".register-content");
const passwordFirst = document.querySelector(
  ".with-email   input[name='userPassword-1']"
);
const passwordSecond = document.querySelector(
  ".with-number input[name='userPassword-2']"
);

Array.from(registerType).forEach((type, i) => {
  type.addEventListener("click", function () {
    console.log("yes it is clicked");

    document
      .querySelector(".toggle-register .active")
      ?.classList.remove("active");
    type.classList.add("active");
    registerContents.forEach((content) => (content.style.display = "none"));
    registerContents[i].style.display = "block";
  });
});
const eyeIcons = document.querySelectorAll(".password-eye");

eyeIcons.forEach((eye) => {
  eye.addEventListener("click", (e) => {
    eye.classList.toggle("eye-active");
    const input = e.target.closest("label").children[0];

    input.type === "password"
      ? (input.type = "text")
      : (input.type = "password");
  });
});

const registerForm = document.querySelector(".signin-form");
const signInBtn = document.querySelector(".enter-btn");

signInBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const data = new FormData(registerForm);
  for (const [key, value] of data) {
    console.log(key + ":" + value);
  }

  console.log("submitted");
});

console.log(registerForms, signInBtn);
