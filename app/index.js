var express = require('express')
var bodyParser = require('body-parser')

const RESPONSE = require('./RESPONSE.js')

const addSubscription = require('./handlers/addSubscription')
const getSubscribers = require('./handlers/getSubscribers')
const rootHandler = require('./handlers/rootHandler')

var app = express();

// parse application/x-www-form-urlencoded
app.use( bodyParser.urlencoded({ extended: false }) )

// parse application/json
app.use( bodyParser.json() )

app.get('/subscribers', getSubscribers);
app.post('/subscribe', addSubscription)
app.post('/', rootHandler);

module.exports = app