const express = require("express");
const client = require("./db/database");
const app = express();

app.use(express.json());

// post request to get Secret Santa List
const helloWorld = require("./routes/helloWorld");
const getSecretSantaList = require("./routes/getSecretSantaList");
app.use("/", helloWorld);
app.use("/get-list", getSecretSantaList);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

client.connect();
