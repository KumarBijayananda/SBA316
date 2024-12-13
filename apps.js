const container = document.getElementById("#container");
const loginForm = document.querySelector("#loginForm");
const userName = document.querySelector("#loginName");
const password = document.querySelector("#loginPassword");
const popUp = document.getElementById(".popUpContainer");
const signUpLink = document.getElementById("signUp");

const user = [
  {
    name: "Kumar",
    password: "kj",
  },
  {
    name: "Delta",
    password: "snake",
  },
];

loginForm.addEventListener("submit", validateUser);

function validateUser(e) {
  const name = userName.value;
  const pass = password.value;
  let isUserValid = false;
  console.log("func ValidateUser is here");
  for (let i = 0; i < user.length; i++) {
    if (name === user[i].name && pass === user[i].password) isUserValid = true;
  }
  if (isUserValid) {
    // window.location.href = "index.html";
  } else {
    e.preventDefault();
    alert("Invalid User ID or Password");
  }
}

signUpLink.addEventListener("click", () => {
  console.log("sign up clicked");
  popUp.style.display = "flex";
});
