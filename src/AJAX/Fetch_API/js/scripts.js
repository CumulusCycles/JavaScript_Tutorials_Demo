"use strict";

/**
 * This function display a Contact on the Page
 * as a LI in the UL Element.
 * 
 * @param contact An instance of a Contact Object
 */
function addContact(contact) {
    // Get UL Element
    let contactsList = document.getElementById('contactsList');

    // Create new LI Element
    let contactListItem = document.createElement('li');

    // Contact Email Anchor
    let contactAnchor = document.createElement('a');
    contactAnchor.setAttribute('href', `mailto:${contact.email}`);
    contactAnchor.append(document.createTextNode(contact.name))

    // Contact Cell
    let contactCellElement = document.createElement('span');
    contactCellElement.className = 'hidden';
    let contactCellText = document.createTextNode(`: ${contact.cell}`);
    contactCellElement.append(contactCellText);

    // Contact Cell Launcher
    let contactCellLauncherElement = document.createElement('span');
    contactCellLauncherElement.className = 'alert'
    let contactCellLauncherText = document.createTextNode(' show cell');
    contactCellLauncherElement.append(contactCellLauncherText);

    // Bind Click Event to contactCellLauncherElement
    contactCellLauncherElement.addEventListener('click', () => {
        // Hide "show cell" 
        contactCellLauncherElement.classList.add('hidden');

        // Display Cell
        contactCellElement.classList.remove('hidden');
    });

    // Append contactAnchor to contactListItem
    contactListItem.append(contactAnchor);
    // Append contactCellElement to contactListItem
    contactListItem.append(contactCellElement);
    // Append contactCellLauncherElement to contactListItem
    contactListItem.append(contactCellLauncherElement);

    // Append contactListItem to contactsList
    contactsList.append(contactListItem);
}

/**
 * This function traverses teh Array of Contacts passed in,
 * instantiates an Instance of a Contact for each contact in the file, 
 * then sends it to the addContact() function for display.
 * 
 * @param contacts  Array of Contacts
 */
function processData(contacts) {
    contacts.forEach(contact => {
        let contactName = contact.name;
        let contactEmail = contact.email;
        let contactCell = contact.cell;
        
        // Create new Contact
        const newContact = new Contact(contactName, contactEmail, contactCell);
        // Add Contact to List (pass contact instance)
        addContact(newContact);
    });
}

/**
 * This function loads data from a JSON file, using XmlHttpRequest.
 * 
 * @param filePath  Path to data file
 */
function loadData(dataFilePath) {
    // Instantiate an XmlHttpRequest Object
    const req = new XMLHttpRequest();
    req.open('GET', dataFilePath, true);
    req.send();

    // set up a listener for the response
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Parse data in text format to JSON
            const contacts = JSON.parse(this.response);
            console.log(contacts);
            processData(contacts);
        }
    };
}

/**
 * This function loads data from a JSON file, using Async/Await.
 * 
 * @param filePath  Path to data file
 */
async function loadDataAsync(dataFilePath) {
    const data = await fetch(dataFilePath);
    const contacts = JSON.parse(await data.text());
    console.log(contacts);
    processData(contacts);
}

/**
 * This function loads data from a JSON file, using fetch().
 * 
 * @param filePath  Path to data file
 */
function fetchData(dataFilePath) {
    fetch(dataFilePath)
    .then(data => data.text())
    .then(data => {
        const contacts = JSON.parse(data);
        console.log(contacts);
        processData(contacts);
    });
}

/**
 * This function loads data from a JSON file, using fetch().
 * It also implements error handling for the Response.
 * 
 * @param filePath  Path to data file
 */
function fetchErrorHandling(dataFilePath) {
    fetch(dataFilePath)
    .then(response => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.text();
    }).then(data => {
        const contacts = JSON.parse(data);
        console.log(contacts);
        processData(contacts);
    }).catch(error => {
        console.log('Error:')
        console.log(error);
    });
}

// Start Processing
window.onload = function() {
    const dataFilePath = './data/contacts.json';
    //loadData(dataFilePath);
    //loadDataAsync(dataFilePath);
    //fetchData(dataFilePath);
    fetchErrorHandling(dataFilePath);
};