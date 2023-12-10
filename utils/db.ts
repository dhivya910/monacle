const { MongoClient } = require("mongodb");
 

// Connection URL
const client = new MongoClient("mongodb+srv://admin:R4FXXsQhIrhJLpu1@cluster0.wkwtd56.mongodb.net/?retryWrites=true&w=majority");

const db = client.db("monacal");

// Export db and client
export { db, client };