const container = document.getElementById("container");
const userName = document.querySelector("#loginName");
const password = document.querySelector("#loginPassword");
const newList = document.getElementById("newList");
const saveList = document.getElementById("saveList");
const listContainer = document.getElementById("listContainer");
const savedList = document.getElementById("savedList");
const loadList = document.getElementById("loadList");
const dropdown = document.getElementById("dropdownList");

let userID = 0;
const currentList = [];
let isTitleMode = true;
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

//Event handler for New List button
newList.addEventListener("click", (e) => {
  isTitleMode = true; // Start with title mode
  newList.disabled = true; //disable New List button

  //create form
  const form = document.createElement("form");
  listContainer.appendChild(form);

  //create input field
  const input = document.createElement("input");
  input.placeholder = "Enter title here"; // Initial placeholder for title
  form.appendChild(input);
  input.focus();

  //create ADD button
  const button = document.createElement("button");
  button.innerText = "Add title"; // Initial button text for title
  form.appendChild(button);

  //create ul for for list
  const ul = document.createElement("ul");
  listContainer.appendChild(ul);

  // Event listener for the Add button
  button.addEventListener("click", (e) => {
    e.preventDefault(); //prevent default page reload

    if (input.value === "") {
      alert("Input field is empty!!");
    } else {
      if (isTitleMode) {
        // Add title as the first list item
        const titleLi = document.createElement("li");
        titleLi.innerText = input.value;

        ul.appendChild(titleLi);
        isTitleMode = false; // Switch to item mode
        button.innerText = "Add item";
        input.placeholder = "Enter list item here";

        const remove = document.createElement("button"); // Remove button for the title
        remove.innerText = "Remove";
        titleLi.appendChild(remove);

        remove.addEventListener("click", (e) => {
          e.preventDefault();
          titleLi.remove();
          currentList.length = 0;
          while (ul.firstChild) {
            //remove entire list if title is removed
            ul.removeChild(ul.firstChild);
          }
        });
      } else {
        // Add regular list item mode
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
      }
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
    // alert("Current List is Empty");
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
    }
  }
  while (listContainer.firstChild) {
    listContainer.removeChild(listContainer.firstChild);
  }
  showSaved();
  console.log(currentList);
  currentList.length = 0;
  newList.disabled = false;
});

//func to show saved list
function showSaved() {
  //savedList.innerHTML = "";

  while (savedList.firstChild) {
    savedList.removeChild(savedList.firstChild);
  }

  const ul = document.createElement("ul");
  savedList.appendChild(ul);
  for (let i = 0; i < user[userID].listArray.length; i++) {
    const li = document.createElement("li");
    ul.appendChild(li);
    li.innerText = user[userID].listArray[i][0];
    li.style.listStyleType = "none";
    li.style.color = "red";
  }
  loadDropdown();
}

//function to show saved lists
function loadDropdown() {
  while (dropdown.firstChild) {
    dropdown.removeChild(dropdown.firstChild);
  }

  for (let i = 0; i < user[userID].listArray.length; i++) {
    const option = document.createElement("option");
    dropdown.appendChild(option);
    option.value = user[userID].listArray[i][0];
    option.text = user[userID].listArray[i][0];
  }
}

//Retrieve the saved list for edit
//Event handler for Load List button
loadList.addEventListener("click", () => {
  currentList.length = 0;
  let indexToLoad = 0;
  for (let i = 0; i < user[userID].listArray.length; i++) {
    if (dropdownList.value === user[userID].listArray[i][0]) {
      indexToLoad = i; //index for array that needs to be loaded
      console.log(`Index to load: ${i}`);
    }
  }

  isTitleMode = true; // Start with title mode
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

  //iterating through saved array to show for edit
  for (let i = 0; i < user[userID].listArray[indexToLoad].length; i++) {
    const li = document.createElement("li");
    input.value = user[userID].listArray[indexToLoad][i];
    li.innerText = input.value;

    if (input.value === "") {
      alert("Input field is empty!!");
    } else ul.appendChild(li);
    // currentList.push(input.value);
    const remove = document.createElement("button"); // Remove button for the list item
    remove.innerText = "Remove";
    li.appendChild(remove);

    //title mode for first item as Title
    if (isTitleMode) {
      isTitleMode = false; //turning title mode off
      //event handler for remove button for title
      remove.addEventListener("click", (e) => {
        e.preventDefault();
        //removing the list from saved array
        user[userID].listArray.splice(indexToLoad, 1);
        li.remove();
        currentList.length = 0;
        while (ul.firstChild) {
          ul.removeChild(ul.firstChild);
        }
      });
    } else {
      //regular item mode
      remove.addEventListener("click", (e) => {
        e.preventDefault();
        for (let i = 0; i < currentList.length; i++) {
          if (currentList[i] === input.value) currentList.splice(i, 1); //removing item from current list
        }
        li.remove();
      });
      // currentList.push(input.value); // Add to the current list array
      input.value = "";
    }
  }
  // input.value = "";
  console.log("current list after loading item from saved list:" + currentList);

  //event handler for ADD button after loading the saved list
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
      for (let i = 0; i < currentList.length; i++) {
        if (currentList[i] === input.value) currentList.splice(i, 1); //removing item from current list
      }
      li.remove();
    });

    currentList.push(input.value); // Add to the current list array
    input.value = "";
    showSaved();
  });
  console.log("current list after adding item to saved list:" + currentList);
  console.log(
    "User array after item being loaded and edited:" + user[userID].listArray
  );
});
