var mongoose = require('mongoose');
var config = require('../config.json');

mongoose.connect(config.database.connectionString);

var db = mongoose.connection;

// has error
db.on('error', console.error.bind(console, 'connection error:'));




