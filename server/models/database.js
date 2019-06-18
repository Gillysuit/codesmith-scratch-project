const pgp = require("pg-promise")();

const uri =
  "postgres://ufrumaho:GoA4EDvj51NUOOC5TkCwgKczox8Uv-wS@raja.db.elephantsql.com:5432/ufrumaho";

const uriLocal = "postgres://dev:ilovetesting@localhost/giftly";
// elephantSQL DB
var db = pgp(uri);

// local PostgreSQL DB
// var db = pgp(uriLocal);

db.one("SELECT $1 AS value", 123)
  .then(function(data) {
    console.log("DATA:", data.value);
  })
  .catch(function(error) {
    console.log("ERROR:", error);
  });

module.exports = db;
