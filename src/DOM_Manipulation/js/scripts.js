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
 * This function validates User input and displays appropriate error messsage(s).
 * 
 * @param msg           HTML Element to display message
 * @param contactName   User entered Contact Name
 * @param email         User entered Contact Email
 * @param cell          User entered Contact Cell
 * 
 * @returns boolean True if input is valid
 */
function validate(msg, contactName, email, cell) {
    // Clear msg span
    msg.innerHTML = '';

    if (contactName.value.trim() == '') {
        msg.innerHTML = 'Contact Name is required.';
        contactName.focus();
    } else if (email.value.trim() == '') {
        msg.innerHTML = 'Email is required.';
        email.focus();
    } else  if (cell.value.trim() == '') {
        msg.innerHTML = 'Cell is required.';
        cell.focus();
    }

    return msg.innerHTML == ''? true : false;
}

// Start Processing
window.onload = function() {
    // Vars to hold HTML Elements
    let addContactForm = document.getElementById('addContactForm');
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let cell = document.getElementById('cell');
    let msg = document.getElementById('msg');
    
    // Bind Event Listeners to Form
    addContactForm.addEventListener('submit', (e) => {
        // Prevent Form from submitting (Stay on current page)
        e.preventDefault();

        // Pass the Elements to validate() so we can position cursosr if required
        if (validate(msg, name, email, cell)) {
            let contactNameVal = name.value.trim();
            let contactEmailVal = email.value.trim();
            let contactCellVal = cell.value.trim();

            // Create Contact
            const contact = new Contact(contactNameVal, contactEmailVal, contactCellVal);
            // Add Contact to List (pass contact instance)
            addContact(contact);

            // Reset form
            addContactForm.reset();
        } // else do nothing (User must address input error)
    });

    addContactForm.addEventListener('reset', () => {
        // Reset error msg (in the event there is one)
        msg.innerHTML = '';

        // Set focus of cursor in contactName field after form is reset
        name.focus();
    });
};