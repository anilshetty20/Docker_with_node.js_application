const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;

const PORT = 5050;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const MONGO_URL = "mongodb://admin:qwerty@mongo:27017";
const client = new MongoClient(MONGO_URL);

let db;

// Connect once when server starts
async function connectDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        db = client.db("apnacollege-db");
    } catch (err) {
        console.error(err);
    }
}
connectDB();


// GET all users
app.get("/getUsers", async (req, res) => {
    const data = await db.collection("users").find({}).toArray();
    res.send(data);
});


// POST new user
app.post("/addUser", async (req, res) => {
    const userObj = req.body;
    const data = await db.collection("users").insertOne(userObj);
    res.send("User added");
});


// IMPORTANT for Docker
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});