import colors from "colors";
import readLine from "readline/promises";
import { listContacts, addContact, getContactById, removeContact } from "./contacts.js";
import util from "util";

const deserializeData = (data) => JSON.parse(data);
const serializeData = (data) => JSON.stringify(data);
const readLineInterface = readLine.createInterface({
   input: process.stdin,
   output: process.stdout,
});
const question = util.promisify(readLineInterface.question).bind(readLineInterface);
const showContacts = () => {
   console.log("\n" + "\n" + "\n" + colors.cyan("YOUR CONTACTS") + "\n");
   console.table(deserializeData(listContacts));
};
const showCommands = () => {
   console.log("\n" + "==============================" + "\n");
   console.log(`${colors.brightBlue("Show Contacts: ")} showContacts`);
   console.log(`${colors.brightBlue("Find Contact by ID: ")} findContact`);
   console.log(`${colors.brightGreen("Add Contact: ")} addContact`);
   console.log(`${colors.brightRed("Remove Contact: ")} removeContact`);
   console.log(`${colors.yellow("Show help:")} help`);
   console.log(`${colors.yellow("Exit:")} exit`);
   console.log("\n" + "==============================" + "\n");
};

const showAddInterface = async () => {
   console.log(`\n" + "==========-${colors.brightGreen("Add Contact")}-==========" + "\n`);
   try {
      let name = await readLineInterface.question(colors.gray(`Please enter contact's ${colors.brightCyan("name")}:\n`));
      let email = await readLineInterface.question(colors.gray(`Please enter contact's ${colors.brightCyan("e-mail")}:\n`));
      let phone = await readLineInterface.question(colors.gray(`Please enter contact's ${colors.brightCyan("phone number")}:\n`));

      addContact(name, email, phone);
   } catch (err) {
      console.log({ err });
   }
};
const showFindInterface = async () => {
   console.log(`\n==========-${colors.brightBlue("Find Contact")}-==========\n`);
   try {
      let id = await readLineInterface.question(colors.gray(`Please enter contact's ${colors.brightCyan("id")}:\n`));
      console.table(getContactById(id));
   } catch (err) {
      console.log({ err });
   }
};
const showRemoveInterface = async () => {
   console.log(`\n==========-${colors.brightRed("Remove Contact")}-==========\n`);
   try {
      let id = await readLineInterface.question(colors.gray(`Please enter contact's ${colors.brightCyan("id")}:\n`));
      removeContact(id);
   } catch (err) {
      console.log({ err });
   }
};

// Hello Screen
showContacts();
showCommands();
// Hello Screen

readLineInterface.on("line", (input) => {
   switch (input.toLowerCase()) {
      case "showcontacts":
         showContacts();
         break;
      case "findcontact":
         showFindInterface();

         break;
      case "addcontact":
         showAddInterface();

         break;
      case "removecontact":
         showRemoveInterface();

         break;
      case "exit":
         console.log(colors.brightMagenta(`\nSEE YOU SOON ! 👋\n`));
         console.log(`To go back to bash please click ${colors.brightBlue("Ctrl + C")} \n`);
         process.exit(0);
      case "help":
         showCommands();
         break;
      default:
         console.log(colors.red(`Incorrect command! For help, type '${colors.yellow("help")}'`));
   }
});
