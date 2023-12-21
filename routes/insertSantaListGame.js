const express = require("express");
const router = express.Router();
const insertSecret = require("../db/queries/insertSecret");

router.post("/", (req, res) => {
  const players = req.body;
  const secret = [];
  for (let i = 0; i < players.length; i++) {
    console.log("Player: ", players[i]);
    console.log("Gifter:", players[i + 1]);
    if (players[i + 1]) {
      secret.push({ Recipient: players[i], Santa: players[i + 1] });
    } else {
      secret.push({ Recipient: players[i], Santa: players[0] });
    }
  }

  insertSecret([JSON.stringify(secret)])
    .then((results) => {
      console.log("Game has been added: ", results);
      console.log(results[0].game);
      res.send(results);
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = router;
