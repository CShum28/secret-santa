const express = require("express");
const router = express.Router();
const insertSecret = require("../db/queries/insertSecret");

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
    // console.log("ShuffleArray Function");
    // console.log("Arr 1: ", array[i]);
    // console.log("Arr 2: ", array[j]);
    // console.log("--");
  }
}

function generateSecretSantaAssignments(players) {
  let shuffled;
  do {
    shuffled = [...players];
    // console.log("##: ", shuffled);
    shuffleArray(shuffled);
    // console.log("post shuffle: ", shuffled);
  } while (shuffled.some((player, idx) => player === players[idx]));

  return players.map((player, idx) => ({
    Recipient: player,
    Santa: shuffled[idx],
  }));
}

router.post("/", (req, res) => {
  const players = req.body;

  const secretSantaAssignments = generateSecretSantaAssignments(players);

  insertSecret([JSON.stringify(secretSantaAssignments)])
    .then((results) => {
      console.log("Game has been added: ", results);
      console.log(results[0].game);
      res.send(secretSantaAssignments);
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = router;
