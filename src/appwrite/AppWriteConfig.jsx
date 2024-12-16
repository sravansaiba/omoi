import { Client, Account, Databases, Storage } from "appwrite";

// Initialize the Appwrite client
const client = new Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('omoi-community')

// Initialize the Account object
const account = new Account(client);
const databases =new Databases(client);
const storage =new Storage(client);
const blogCollection = '673cc66000304f95b12b';

export { client, account,databases,storage,blogCollection };