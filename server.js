const express = require('express');
const dotenv = require('dotenv');
const app = express();

const mongodb = require('./routes/data/database')

app.use('/', require('./routes/contacts'));

const port = process.env.PORT ||3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});