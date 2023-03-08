const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.join("db", "contacts.json");
require("colors");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const parsedContacts = JSON.parse(data);
    if (parsedContacts.length < 1) {
      return console.log("Contacts list is empty!".red);
    }
    return parsedContacts;
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const parsedContacts = JSON.parse(data);
    const searchedContact = parsedContacts.find(
      ({ id }) => String(id) === String(contactId)
    );
    if (!searchedContact) {
      return console.log(`Contact with id: ${contactId} not found!`.red);
    }
    return searchedContact;
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const parsedContacts = JSON.parse(data);
    const contactIndex = parsedContacts.findIndex(
      ({ id }) => String(id) === String(contactId)
    );
    if (contactIndex === -1) {
      return console.log(`Contact with id: ${contactId} not found!`.red);
    }
    const newContacts = parsedContacts.filter(
      ({ id }) => String(id) !== String(contactId)
    );

    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    console.log(`Contact with ID: ${contactId} was deleted`.green);
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath);
    const parsedContacts = JSON.parse(data);
    const newContact = { id: nanoid(), name, email, phone };
    const newContacts = [...parsedContacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    console.log(`Contact ${name} was created`.green);
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
