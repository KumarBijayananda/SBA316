const name = document.querySelector("#signUpName");
const email = document.querySelector("#signUpEmail");
const pass = document.querySelector("#signUpPassword");
const signUp = document.getElementById("signUp");

// signUp.addEventListener = (e) => {
//   console.log("test");
//   e.preventdefault();
//   //   console.log(name.value);
// };
signUp.addEventListener("click", (e) => {
  console.log("test");
  e.preventDefault();

  console.log(name.value);
  console.log(user[0].name);
});
