const container = document.getElementById("container");
const userName = document.querySelector("#loginName");
const password = document.querySelector("#loginPassword");
const newList = document.getElementById("newList");
const saveList = document.getElementById("saveList");
const listContainer = document.getElementById("listContainer");
const savedList = document.getElementById("savedList");
let userID = 0;
currentList = [];

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

saveList.append(user[0].listArray);

function validateUser(e) {
  e.preventDefault();
  const name = userName.value;
  const pass = password.value;
  let isUserValid = false;
  console.log("func ValidateUser is here");
  for (let i = 0; i < user.length; i++) {
    if (name === user[i].name && pass === user[i].password) {
      isUserValid = true;
      userID = i;
    }
  }
  if (!isUserValid) {
    alert("Invalid User ID or Password");
  } else {
    window.location.assign("/index.html");
  }
}

newList.addEventListener("click", (e) => {
  console.log(user[0].listArray[0]);

  const form = document.createElement("form");
  listContainer.appendChild(form);
  console.log(user[0].listArray);
  // if (currentList[0] === "") {
  const input = document.createElement("input");
  input.placeholder = "Enter list item here";
  form.appendChild(input);
  input.focus();
  const button = document.createElement("button");
  button.innerText = "Add Item";
  form.appendChild(button);
  // } else {
  //   const input = document.createElement("input");
  //   input.placeholder = "Enter title here";
  //   form.appendChild(input);
  //   input.focus();
  //   const button = document.createElement("button");
  //   button.innerText = "Add Title";
  //   form.appendChild(button);
  // }

  const ul = document.createElement("ul");
  listContainer.appendChild(ul);

  //event listener for the ADD button
  button.addEventListener("click", (e) => {
    // console.log(e.target.textContent);
    e.preventDefault();
    const li = document.createElement("li");
    ul.appendChild(li);
    li.innerText = input.value;
    const remove = document.createElement("button"); //remove button for the list
    remove.innerText = "Remove";
    li.appendChild(remove);
    remove.addEventListener("click", (e) => {
      //event listener for the remove button
      e.preventDefault();
      li.remove(li.firstChild);
    });
    currentList.push(input.value);
    input.value = "";
  });
});

// form.onsubmit = (e) => {
//     if (e.target.textContent === "Add Title") {
//       console.log(e.target.textContent);
//       e.preventDefault();
//       const li = document.createElement("li");
//       ul.appendChild(li);
//       li.innerText = input.value;
//       currentList.push(input.value);
//       input.value = "";
//     }
// };
// });

//Event Listener for Save List Button
saveList.addEventListener("click", (e) => {
  user[0].listArray = currentList;
  showSaved();
  while (listContainer.firstChild) {
    listContainer.removeChild(listContainer.firstChild);
  }
});

//func to show saved list
function showSaved() {
  const ul = document.createElement("ul");
  savedList.appendChild(ul);
  const li = document.createElement("li");
  ul.appendChild(li);
  li.innerText = user[0].listArray[0];
}
