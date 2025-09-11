const express = require('express');
const dotenv = require('dotenv');
const app = express();


const port = process.env.PORT || 3000;
const mongodb = require('./routes/data/database')

app.use('/', require('./routes/contacts'));

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        });
    }
});

