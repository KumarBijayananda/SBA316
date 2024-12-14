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

//func called when login is attempted
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

newList.addEventListener("click", (e) => {
  let isTitleMode = true; // Start with title mode
  const form = document.createElement("form");
  listContainer.appendChild(form);

  const input = document.createElement("input");
  input.placeholder = "Enter title here"; // Initial placeholder for title
  form.appendChild(input);
  input.focus();

  const button = document.createElement("button");
  button.innerText = "Add Title"; // Initial button text for title
  form.appendChild(button);

  const ul = document.createElement("ul");
  listContainer.appendChild(ul);

  // Event listener for the Add button
  button.addEventListener("click", (e) => {
    e.preventDefault();
    if (isTitleMode) {
      // Add title as the first list item
      const titleLi = document.createElement("li");
      titleLi.innerText = input.value;
      ul.appendChild(titleLi);

      // Switch to item mode
      isTitleMode = false;
      button.innerText = "Add Item";
      input.placeholder = "Enter list item here";

      const remove = document.createElement("button"); // Remove button for the title
      remove.innerText = "Remove";
      titleLi.appendChild(remove);

      remove.addEventListener("click", (e) => {
        e.preventDefault();
        titleLi.remove();
        while (ul.firstChild) {
          ul.removeChild(ul.firstChild);
        }
      });
      currentList.push(input.value); // Add to the current list array

      input.value = "";
    } else {
      // Add regular list item
      const li = document.createElement("li");
      li.innerText = input.value;
      ul.appendChild(li);

      const remove = document.createElement("button"); // Remove button for the list item
      remove.innerText = "Remove";
      li.appendChild(remove);

      remove.addEventListener("click", (e) => {
        e.preventDefault();
        li.remove();
      });

      currentList.push(input.value); // Add to the current list array
      input.value = "";
    }
  });
});

//Event Listener for Save List Button
saveList.addEventListener("click", (e) => {
  user[userID].listArray = currentList;
  showSaved();
  while (listContainer.firstChild) {
    listContainer.removeChild(listContainer.firstChild);
  }

  saveList.append(user[userID].listArray);
});

//func to show saved list
function showSaved() {
  const ul = document.createElement("ul");
  savedList.appendChild(ul);
  const li = document.createElement("li");
  ul.appendChild(li);
  li.innerText = user[userID].listArray[0];
}
