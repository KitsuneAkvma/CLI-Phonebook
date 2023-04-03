import fs from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";

const contactsPath = path.join("db", "contacts.json");

const listContacts = await fs.readFile(contactsPath, { encoding: "utf-8" });

const getContactById = (id) => {
   const contacts = JSON.parse(listContacts);
   return contacts.filter((contact) => contact.id === id);
};

const addContact = (name, email, phone) => {
   const newContactData = {
      id: nanoid(),
      name,
      email,
      phone,
   };
   const previousContactsList = JSON.parse(listContacts);
   const newContactsList = JSON.stringify([...previousContactsList, newContactData]);

   fs.writeFile(contactsPath, newContactsList);
};

const removeContact = (id) => {
   const previousContactsList = JSON.parse(listContacts);
   const newContactsList = JSON.stringify(previousContactsList.filter((contact) => contact.id !== id));
   fs.writeFile(contactsPath, newContactsList);
};

export { listContacts, getContactById, removeContact, addContact };
