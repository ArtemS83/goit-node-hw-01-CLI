const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require('./contacts');

const argv = require('yargs').argv;
// console.log(argv);
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      listContacts().then(console.log);
      break;

    case 'get':
      if (!id) {
        console.log('Not action type id');
        return;
      }
      if (id === true) {
        console.log('Please inter id');
        return;
      }
      getContactById(id).then(console.log);
      break;

    case 'add':
      if (name === true) {
        name = undefined;
      }
      if (email === true) {
        email = undefined;
      }
      if (phone === true) {
        phone = undefined;
      }
      if (!name && !email && !phone) {
        console.log('Please inter data contact');
        return;
      }
      //   if (name === true) {
      //     name = undefined;
      //   }
      addContact(name, email, phone).then(console.log);
      break;

    case 'remove':
      if (!id) {
        console.log('Not action type id');
        return;
      }
      removeContact(id).then(console.log);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
