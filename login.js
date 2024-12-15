const userName = document.querySelector("#loginName");
const password = document.querySelector("#loginPassword");

const user = [
  {
    name: "Kumar",
    email: "kumar@gmail.com",
    password: "kj",
    listArray: [],
  },
  {
    name: "Delta",
    email: "delta@gmail.com",
    password: "snake",
    listArray: [],
  },
];

function validateUser(e) {
  e.preventDefault();
  const name = userName.value;
  const pass = password.value;
  let isUserValid = false;
  for (let i = 0; i < user.length; i++) {
    if (name === user[i].name && pass === user[i].password) {
      isUserValid = true;
      userID = i; //setting user ID
    }
  }
  if (!isUserValid) {
    alert("Invalid User ID or Password");
  } else {
    window.location.assign("/index.html");
  }
}
