const db = require("../database");

const getGameById = (id) => {
  const queryString = `SELECT * FROM game WHERE id = $1`;
  const value = [id];

  return db.query(queryString, value).then((res) => {
    return res.rows[0];
  });
};

module.exports = getGameById;
