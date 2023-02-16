const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let database;

async function getdatabase() {
  const client = await MongoClient.connect("mongodb://127.0.0.1:27017");

  database = client.db("accounts");

  if (database) {
    console.log("database found");
  } else {
    console.log("database not found");
  }
  return database;
}

module.exports = {
  getdatabase,
};
