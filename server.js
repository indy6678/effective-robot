const mysql = require("mysql2");
const express = require("express");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// to test Express connection: confirmed
// app.use('/', (req, res) => {
//     res.json({
//         message: 'Hello world!'
//     })
// });

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

// route to show all departments
app.get("/api/departments", (req, res) => {
  const sql = `SELECT * FROM department`;

  // database query to show all columns in department table
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    // if there is no error
    res.json({
      message: "success",
      data: rows,
    });
    console.log(rows);
  });
});

// route to show current employees
app.get('/api/employees', (req, res) => {
  const sql = `SELECT * FROM employee`;

  db.query(sql, (err, rows) => {
    if(err) {
      res.status(500).json({error: err.message});
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// route to show current roles
app.get('/api/roles', (req, res) => {
  const sql = `SELECT * FROM role`;

  db.query(sql, (err, rows) => {
    if(err) {
      res.status(500).json({ error: err.message});
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// api route for query to show individually selected department
app.get("/api/department/:id", (req, res) => {
  const sql = `SELECT * FROM department WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row,
    });
  });
});

// database query to delete a single row, hard-coded as 1
// db.query(`DELETE FROM department WHERE id = ?`, 1, (err, result) => {
//     if(err) {
//         console.log(err);
//     }
//     console.log(result);
// });

// route to add
// app.post()
// query to add

// response used for requests not accounted for; keep last
app.use((req, res) => {
  res.status(404).end();
});

// open port
app.listen(PORT, () => {
  console.log(`Server now open on port ${PORT}`);
});
