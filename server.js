const express = require('express');
// const dotenv = require('dotenv');
require('dotenv').config();
const app = express();


const port = process.env.PORT || 3000;
const mongodb = require('./data/database')

app.use('/', require('./routes/index'));

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Database is connected and listening on port ${port}`);
        });
    }
});
