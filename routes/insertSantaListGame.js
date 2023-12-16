const express = require("express");
const router = express.Router();
const insertSecret = require("../db/queries/insertSecret");

router.post("/", (req, res) => {
  const secret = [];
  let santas = [...req.body];

  req.body.forEach((player) => {
    let santa;

    // picks a random Santa for the player
    const randomSanta = () => {
      santa = santas[Math.floor(Math.random() * santas.length)];
    };

    randomSanta();

    // check to ensure player does not get themselves
    while (santa === player) {
      // check to ensure if the last player gets themselves it does not infinite loop
      if (santas.length > 1) {
        randomSanta();
      } else {
        secret.push("The last player got themselves, please run again");
        break;
      }
    }

    // removes the Secret Santa santas after a Santa is picked
    santas = santas.filter((player) => player !== santa);
    let assignment = { Recipient: player, Santa: santa };
    secret.push(assignment);
  });

  insertSecret([JSON.stringify(secret)])
    .then((results) => {
      console.log("Game has been added: ", results);
    })
    .catch((err) => console.log(err));

  console.log(secret);
  res.send(secret);
});

module.exports = router;
