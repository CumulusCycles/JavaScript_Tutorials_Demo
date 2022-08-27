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
 * This function loads data from a JSON file, 
 * instantiates an Instance of a Contact for each contact in the file, 
 * then sends it to the addContact() function for display.
 */
function loadData() {
    // Instantiate an XmlHttpRequest Object
    const req = new XMLHttpRequest();
    req.open('GET', './data/contacts.json', true);
    req.send();

    // set up a listener for the response
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Parse data in text format to JSON
            const contacts = JSON.parse(this.response);
            console.log(contacts);

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
    };
}

// Start Processing
window.onload = function() {
    loadData();
};