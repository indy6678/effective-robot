const mysql = require('mysql2');
const app = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// to test Express connection
app.use('/', (req, res) => {
    res.json({
        message: 'Hello world!'
    })
});

// response used for requests not accounted for
app.use((req, res) => {
    res.status(404).end();
})

app.listen(PORT, () => {
    console.log(`Server now open on port ${PORT}`);
})