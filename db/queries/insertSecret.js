const db = require("../database");

const insertSecret = (game) => {
  const queryString = `INSERT INTO game(game) VALUES($1) RETURNING *`;
  const value = game;

  return db.query(queryString, value).then((res) => {
    return res.rows;
  });
};

module.exports = insertSecret;
