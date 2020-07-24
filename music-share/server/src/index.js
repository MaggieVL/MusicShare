const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const routes = require('./routes');
const sendErrorResponse = require('./routes/utils.js').sendErrorResponse;

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT;
const dbName = process.env.DB_NAME;

const corsOptions = {
    origin: process.env.CLIENT_URI,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/static/songs', express.static('./static/songs')); 

app.use('/api', routes);

app.use(function (err, req, res, next) {
    console.error(err.stack)
    sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
});

MongoClient.connect(process.env.DB_URL, { useUnifiedTopology: true }, function (err, con) {
    if (err) throw err;
    app.locals.db = con.db(dbName);
    console.log(`Connection extablished to ${dbName}.`);
    app.listen(port, () => console.log(`${dbName} server listening at http://localhost:${port}`))
});
