"use strict";

// This function validates user intput
function validate(itemNameValue, itemQuantityValue, message) {
  let valid = false;

  if (itemNameValue == '') {
    message.innerHTML = 'Please enter an Item Name.';
  } else if (itemQuantityValue == '') {
    message.innerHTML = 'Please enter a Quantity.';
  } else {
    valid = true;
  }

  return valid;
}

// This function displays an item on the page
function displayItem(itemNameValue, itemQuantityValue, itemList) {
  let itemToAdd = '<li>' + itemQuantityValue + ' ' + itemNameValue + '(s)</li>';
  itemList.innerHTML += itemToAdd;
}

// This function resets the form after an item has been added
function resetForm(itemName, itemQuantity, message) {
  itemName.value = '';
  itemQuantity.value = 0;
  message.innerHTML = '';

  itemName.focus();
}

// This function creates a new Item object and pushes it to listItems Array
function populateArray(listItems, itemNameValue, itemQuantityValue) {
  let item = new Item(itemNameValue, itemQuantityValue);
  listItems.push(item);
  console.log(listItems);
}

// This function handles the Clear LocalStorage Button
function initClearStorageButton(clearStorage) {
  // bind click event listener to the form submit event
  clearStorage.addEventListener('click', function(e) {
    // clear LocalStorage
    localStorage.removeItem('persistedItems');
    console.log('LocalStorage has been cleared.');
  }, false);

  clearStorage.className = 'show';
}

// This function checks for existing itesm in LocalStorage
function checkForExistingItems(listItems, clearStorage) {
  if (typeof(Storage) !== "undefined") {
    // try and get item from storage
    let persistedItems = localStorage.getItem('persistedItems');

    if (persistedItems !== null) {
      persistedItems = JSON.parse(persistedItems);

      console.log(persistedItems);

      // loop through persistedItems
      for (let i in persistedItems) {
        let item = persistedItems[i];

        let itemNameValue = item.name;
        let itemQuantityValue = item.qty;

        // Call fucntion to create new item object and push to listItems Array
        populateArray(listItems, itemNameValue, itemQuantityValue);

        // Call function to display item on page
        displayItem(itemNameValue, itemQuantityValue, itemList);
      }

      initClearStorageButton(clearStorage);
    }
  }
}

window.onload = function() {
    // create empty Array to hold Items.
    let listItems = [];

    // create letaibles to hold HTML Elements
    let theForm = document.getElementById('theForm');
    let itemName = document.getElementById('itemName');
    let itemQuantity = document.getElementById('itemQuantity');
    let message = document.getElementById('message');
    let itemList = document.getElementById('itemList');
    let clearStorage = document.getElementById('clearStorage');

    // check for items in LocalStorage
    checkForExistingItems(listItems, clearStorage);

    // bind submit event listener to the form submit event
    theForm.addEventListener('submit', function(e) {
      // prevent default behavior / prevent form from submitting
      e.preventDefault();

      // get input field values
      let itemNameValue = itemName.value.trim();
      let itemQuantityValue = itemQuantity.value.trim();

      let valid = validate(itemNameValue, itemQuantityValue, message);

      if (valid) {
          // add item to page
          displayItem(itemNameValue, itemQuantityValue, itemList);

          // create new item object and push to listItems Array
          populateArray(listItems, itemNameValue, itemQuantityValue);

          // persist listItems to LocalStorage
          localStorage.setItem('persistedItems', JSON.stringify(listItems));

          resetForm(itemName, itemQuantity, message);
      }
    }, false);
};