const mysql = require("mysql2");
const express = require("express");
const { application, response } = require("express");

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

// route to show current departments
app.get("/api/departments", (req, res) => {
  const sql = `SELECT * FROM department`;

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
    console.table(rows);
  });
});

// // route to show current employees
// app.get('/api/employees', (req, res) => {
//   const sql = `SELECT * FROM employee`;

//   db.query(sql, (err, rows) => {
//     if(err) {
//       res.status(500).json({error: err.message});
//       return;
//     }
//     res.json({
//       message: 'success',
//       data: rows
//     });
//     console.table(rows)
//   });
// });

// route to show current employees
app.get("/api/employees", (req, res) => {
  const sql = `SELECT employee.first_name, employee.last_name, role.title, role.department_id AS department, employee.manager_id
                AS manager
                FROM employee
                LEFT JOIN role
                ON employee.manager_id = employee.id`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
    console.table(rows);
  });
});

// route to show current roles
app.get("/api/roles", (req, res) => {
  const sql = `SELECT role.title, role.salary, department.name
               AS department
               FROM role
               LEFT JOIN department
               ON role.department_id = department.id`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    }
    res.json({
      message: "success",
      data: rows,
    });
    console.table(rows);
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
    console.table(row);
  });
});

// route to add a department
app.post("/api/department", ({ body }, res) => {
  const sql = `INSERT INTO department (name)
    VALUES(?)`;
  const params = [body.name];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: body,
    });
  });
});

// route to add an employee
app.post("api/employee", ({ body }, res) => {
  const sql = `INSERT INTO employee (first_name, last_name, role, manager)
    VALUES(?,?,?,?)`;
  const params = [body.first_name, body.last_name, body.role, body.manager];

  db.query(sql, params, (err, results) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: body,
    });
  });
});

// route to add a role
app.post("api/role", ({ body }, res) => {
  const sql = `INSERT INTO role (name, name, department)
  VALUES(?,?,?)`;
  const params = [body.name, body.salary, body.department];

  db.query(sql, params, (err, results) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: body,
    });
  });
});

// database query to delete a single department
app.delete("/api/department/:id", (req, res) => {
  const sql = `DELETE FROM department WHERE id = ?`;
  const params = [req.params.id];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.affectedRows) {
      // if the department was not found
      res.json({
        message: "Department not found",
      });
    } else {
      res.json({
        message: "Deleted", // confirmation message of a successful deletion
        changes: result.affectedRows, // shows how many rows were affected
        id: req.params.id, // shows the id of the affected row
      });
    }
  });
});

// database query to delete a single employee
app.delete('/api/employee/:id', (req, res) => {
  const sql = `DELETE FROM employee WHERE id = ?`;
  const params = req.params.id;
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    } else if (!result.affectedRows) {
      // if the employee was not found
      res.json({
        message: "Employee not found",
      });
    } else {
      res.json({
        message: "Deleted", // confirmation message of a successful deletion
        changes: result.affectedRows, // shows how many rows were affected
        id: req.params.id, // shows the id of the affected row
      });
    }
  });
});

// update employee
app.put('/api/employee/:id', (req, res) => {
  const sql = `UPDATE employee SET first_name = ?
              WHERE id = ?`;
  const params = [req.body.first_name, req.params.id];
  db.query(sql, params, (err, result) => {
    if(err) {
      res.status(400).json({error: err.message});
    } else if(!result.affectedRows) {
      res.json({
        message: 'Employee not found'
      })
    } else {
      res.json({
        message: 'Success',
        data: req.body,
        changes: result.affectedRows
      })
    }
  })
})

// response used for requests not accounted for; keep last
app.use((req, res) => {
  res.status(404).end();
});

// open port
app.listen(PORT, () => {
  console.log(`Server now open on port ${PORT}`);
});
