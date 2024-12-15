const container = document.getElementById("container");
const userName = document.querySelector("#loginName");
const password = document.querySelector("#loginPassword");
const newList = document.getElementById("newList");
const saveList = document.getElementById("saveList");
const listContainer = document.getElementById("listContainer");
const savedList = document.getElementById("savedList");
const loadList = document.getElementById("loadList");

let userID = 0;
const currentList = [];
const titleList = [];

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

//function called when login is attempted
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
  newList.disabled = true; //disable New List button

  const form = document.createElement("form");
  listContainer.appendChild(form);

  const input = document.createElement("input");
  input.placeholder = "Enter title here"; // Initial placeholder for title
  form.appendChild(input);
  input.focus();

  const button = document.createElement("button");
  button.innerText = "Add title"; // Initial button text for title
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

      //check if input is empty
      if (input.value === "") {
        alert("Input field is empty!!");
      } else {
        ul.appendChild(titleLi);

        // Switch to item mode
        isTitleMode = false;
        button.innerText = "Add item";
        input.placeholder = "Enter list item here";
      }
      const remove = document.createElement("button"); // Remove button for the title
      remove.innerText = "Remove";
      titleLi.appendChild(remove);

      remove.addEventListener("click", (e) => {
        e.preventDefault();
        titleLi.remove();
        currentList.length = 0;
        while (ul.firstChild) {
          ul.removeChild(ul.firstChild);
        }
      });
    } else {
      // Add regular list item
      const li = document.createElement("li");
      li.innerText = input.value;

      if (input.value === "") {
        alert("Input field is empty!!");
      } else ul.appendChild(li);

      const remove = document.createElement("button"); // Remove button for the list item
      remove.innerText = "Remove";
      li.appendChild(remove);

      remove.addEventListener("click", (e) => {
        e.preventDefault();
        li.remove();
      });
    }
    currentList.push(input.value); // Add to the current list array
    input.value = "";
  });
});

//Event Listener for Save List Button
saveList.addEventListener("click", (e) => {
  let isListTitleExist = false;
  let indexTitle = 0;

  if (currentList.length === 0) {
    alert("Current List is Empty");
  } else {
    for (let i = 0; i < user[userID].listArray.length; i++) {
      if (user[userID].listArray[i][0] === currentList[0]) {
        isListTitleExist = true;
        indexTitle = i;
      }
    }

    if (isListTitleExist) {
      user[userID].listArray.splice(indexTitle, 1, currentList);
    } else {
      user[userID].listArray.push([...currentList]);
      showSaved();
    }
  }
  while (listContainer.firstChild) {
    listContainer.removeChild(listContainer.firstChild);
  }
  currentList.length = 0;
  newList.disabled = false;
});

//func to show saved list
function showSaved() {
  // savedList.innerHTML = "";
  const ul = document.createElement("ul");
  savedList.appendChild(ul);
  // for (let i = 0; i < user[userID].listArray.length; i++) {
  const li = document.createElement("li");
  ul.appendChild(li);
  li.innerText = user[userID].listArray[user[userID].listArray.length - 1][0];
  titleList.push(li.innerText);
  li.style.listStyleType = "none";
  li.style.color = "red";
  loadDropdown();
}
// }

//function to show saved lists
function loadDropdown() {
  const dropdown = document.getElementById("dropdownList");

  // for (let i = 0; i < titleList.length; i++) {
  const option = document.createElement("option");
  dropdown.appendChild(option);
  option.value = titleList[titleList.length - 1];
  option.text = titleList[titleList.length - 1];
  // }
}

//Retrieve the saved list for edit
loadList.addEventListener("click", () => {
  let indexToLoad = 0;
  console.log(dropdownList.value);
  console.log(titleList);
  for (let i = 0; i < titleList.length; i++) {
    if (dropdownList.value === titleList[i]) {
      indexToLoad = i; //index for array that needs to be loaded
    }
  }
  let isTitleMode = true; // Start with title mode
  newList.disabled = true;
  const form = document.createElement("form");
  listContainer.appendChild(form);

  const input = document.createElement("input");
  input.placeholder = "Enter list item here";
  form.appendChild(input);
  input.focus();

  const button = document.createElement("button");
  button.innerText = "Add item";
  form.appendChild(button);

  const ul = document.createElement("ul");
  listContainer.appendChild(ul);

  for (let i = 0; i < user[userID].listArray[indexToLoad].length; i++) {
    const li = document.createElement("li");
    input.value = user[userID].listArray[indexToLoad][i];
    li.innerText = input.value;

    if (input.value === "") {
      alert("Input field is empty!!");
    } else ul.appendChild(li);
    currentList.push(input.value);
    const remove = document.createElement("button"); // Remove button for the list item
    remove.innerText = "Remove";
    li.appendChild(remove);

    if (isTitleMode) {
      remove.addEventListener("click", (e) => {
        isTitleMode = false;
        li.remove();
        currentList.length = 0;
        while (ul.firstChild) {
          ul.removeChild(ul.firstChild);
        }
      });
    } else {
      remove.addEventListener("click", (e) => {
        li.remove();
      });
      currentList.push(input.value); // Add to the current list array
      input.value = "";
    }
  }
  input.value = "";

  button.addEventListener("click", (e) => {
    e.preventDefault();

    // Add regular list item
    const li = document.createElement("li");
    li.innerText = input.value;

    if (input.value === "") {
      alert("Input field is empty!!");
    } else ul.appendChild(li);

    const remove = document.createElement("button"); // Remove button for the list item
    remove.innerText = "Remove";
    li.appendChild(remove);

    remove.addEventListener("click", (e) => {
      e.preventDefault();
      li.remove();
    });

    currentList.push(input.value); // Add to the current list array
    input.value = "";
    // }
  });
});
