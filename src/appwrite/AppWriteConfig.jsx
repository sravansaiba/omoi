import { Client, Account, Databases, Storage } from "appwrite";



const BlogCOLLECTION_ID = import.meta.env.VITE_BLOG_COLLECTION_ID;





// Initialize the Appwrite client
const client = new Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('omoi-community')

// Initialize the Account object
const account = new Account(client);
const databases =new Databases(client);
const storage =new Storage(client);
const blogCollection = BlogCOLLECTION_ID;

export { client, account,databases,storage,blogCollection };