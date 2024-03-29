const mongoose = require("mongoose")

const { MONGO_URI } = process.env

//connection with the database
exports.connect = () => {
    mongoose
    .connect(MONGO_URI, {
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Successfully connected to Mongo Database");
    })
    .catch((error) => {
        console.log("Database connection failed.. Exiting now..");
        console.error(error);
        process.exit(1);
    })
}