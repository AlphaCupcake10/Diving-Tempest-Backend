const { db } = require("./server-config");
const mongoose = require("mongoose");

async function connectToDatabase()
{
    await mongoose.connect(`mongodb://0.0.0.0:27017/${db.name}`);
    console.log("Connected to database at " + db.uri);
}

module.exports = {
    connectToDatabase,
}