const express = require("express");
const client = require("./db/database");
const app = express();

app.use(express.json());

const helloWorld = require("./routes/helloWorld");
const getSantaListById = require("./routes/getSantaListById");
const insertSantaListGame = require("./routes/insertSantaListGame");

app.use("/", helloWorld);
app.use("/get-game", getSantaListById);
app.use("/insert-list", insertSantaListGame);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

client.connect();
