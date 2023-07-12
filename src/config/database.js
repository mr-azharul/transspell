const mongoose = require("mongoose");

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ignoreUndefined: true
}

const username = process.env.MONGODB_USER;
const password = process.env.MONGODB_PASS;
const cluster = process.env.MONGODB_CLUSTER;
const dbname = process.env.MONGODB_DB;

const connection = mongoose.createConnection(`mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`, options, (err) => {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("connected to database");
    }
});

module.exports = connection;