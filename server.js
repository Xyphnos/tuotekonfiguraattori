'use strict';

//requires
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const db = require('./database/db');
const port = 3000;

const confRoute = require('./routers/ConfRouter');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/public',express.static('public'));

app.use('/conf', confRoute);



db.on('connected', () => {
    app.listen(port, () => console.log(`App listening on port ${port}!`));
});
