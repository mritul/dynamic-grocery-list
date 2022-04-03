const form = document.querySelector("form");
const nameInput = document.querySelector("#nameInput");
const qtyInput = document.querySelector("#qtyInput");
const addBtn = document.querySelector("#addBtn");
var tableBody = document.querySelector("#tableBody");
const alertMsg = document.querySelector("#alertMsg");

if (localStorage.getItem("dataArray") == null) {
  var arrayInit = [];
  var strArr = JSON.stringify(arrayInit);
  localStorage.setItem("dataArray", strArr);
} else {
  //Displaying data from localStorage in the UI
  var dataArray = JSON.parse(localStorage.getItem("dataArray"));
  console.log(dataArray);
  for (var i = 0; i < dataArray.length; i++) {
    const itemName = dataArray[i].name;
    const itemQty = dataArray[i].qty;

    var tr = document.createElement("tr");

    var tdName = document.createElement("td");
    var nameText = document.createTextNode(`${itemName}`);
    tdName.appendChild(nameText);

    var tdQty = document.createElement("td");
    var qtyText = document.createTextNode(`${itemQty}`);
    tdQty.appendChild(qtyText);

    tr.appendChild(tdName);
    tr.appendChild(tdQty);

    tableBody.appendChild(tr);
  }
}

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  //If input is empty we display a disappearing alert
  if (nameInput.value === "" || qtyInput.value === "") {
    alertMsg.classList.remove("d-none");
    setTimeout(() => {
      alertMsg.classList.add("d-none");
    }, 2000);
  } else {
    addGroceryItem();
  }
});

const addGroceryItem = () => {
  const name = nameInput.value;
  const qty = qtyInput.value;

  //Creating object with data to push into array in the local storage
  var objToPush = { name: name, qty: qty };

  //Getting array stored inside object in localStorage
  var array = JSON.parse(localStorage.getItem("dataArray"));
  array.push(objToPush);
  localStorage.setItem("dataArray", JSON.stringify(array));

  //UI Updation
  var tr = document.createElement("tr");

  var tdName = document.createElement("td");
  var nameText = document.createTextNode(`${name}`);
  tdName.appendChild(nameText);

  var tdQty = document.createElement("td");
  var qtyText = document.createTextNode(`${qty}`);
  tdQty.appendChild(qtyText);

  tr.appendChild(tdName);
  tr.appendChild(tdQty);

  tableBody.appendChild(tr);

  //Resetting defaults
  nameInput.value = "";
  qtyInput.value = "";
};
