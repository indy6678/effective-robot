const mysql = require('mysql2');
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({extended: false}));
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
        host: 'localhost',
        user: 'root',
        password: 'r]wuM.~w7LhsW>bJ',
        database: 'roster'
    },
    console.log('Now connected to the roster database.')
);

// database query to show all rows in department table
db.query(`SELECT * FROM department`, (err, rows) => {
    console.log(rows);
});

// database query to show row with id 1 in department table
db.query(`SELECT * FROM department WHERE id = 1`, (err, row) => {
    if(err) {
        console.log(err);
    }
    console.log(row);
})

// database query to delete a single row
db.query(`DELETE FROM department WHERE id = ?`, 1, (err, result) => {
    if(err) {
        console.log(err);
    }
    console.log(result);
});

// response used for requests not accounted for
app.use((req, res) => {
    res.status(404).end();
})

app.listen(PORT, () => {
    console.log(`Server now open on port ${PORT}`);
})