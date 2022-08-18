const mysql = require("mysql2");

// connect to the database
const db = mysql.createConnection(
    {
      host: "localhost",
      user: "root",
      password: "r]wuM.~w7LhsW>bJ",
      database: "roster",
    },
    console.log("Now connected to the roster database.")
  );

  module.exports = db;