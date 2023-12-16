const express = require("express");
const router = express.Router();
const getGameById = require("../db/queries/getGameById");

router.get(`/:id`, (req, res) => {
  const gameId = req.params.id;

  getGameById(gameId).then((results) => {
    res.json(results);
  });
});

module.exports = router;
