const fs = require('fs').promises;
const path = require('path');
const shortid = require('shortid');

const contactsPath = path.join(__dirname, '/db/contacts.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    // console.log(contacts);
    return contacts;
  } catch (error) {
    console.log(error.message);
  }
}
// listContacts().then(console.log);

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const [contact] = contacts.filter(contact => contact.id === contactId);
    // const { name, email, phone } = contact;
    // console.log('name :', name, 'email: ', email, 'phone :', phone);
    if (!contact) {
      console.log(`Contact id:${contactId} is not find!`);
      return;
    }
    return contact;
  } catch (error) {
    console.log(error.message);
  }
}
// getContactById(1).then(console.log);

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const contactList = contacts.filter(contact => contact.id !== contactId);
    if (contacts.length === contactList.length) {
      console.log(`Contact id:${contactId} is not find!`);
      return;
    }
    await fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2));
    console.log(`Contact ${contactId} delete!`);
    return contactId;
  } catch (error) {
    console.log(error.message);
  }
}
// removeContact(10).then(console.log);

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const newContact = { id: shortid.generate(), name, email, phone };
    // console.log(newContact);
    const contactList = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2));
    console.log(`Add new contact!`);
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
}
// addContact('AAA', 'aa@mail.com', '452-525-566').then(console.log);

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
