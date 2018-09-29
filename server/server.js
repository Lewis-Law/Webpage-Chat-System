const express = require('express');
const app = express();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const fs = require('fs');
var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../dist/chat/')));
require('./listen.js')(http);

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
MongoClient.connect(url, { poolSize: 10 }, function (err, client) {
  if (err) { return console.log(err) }
  const dbName = 'users';
  const db = client.db(dbName);
  require('./routes/create.js')(app, db);
  require('./routes/remove.js')(app, db);
  require('./routes/update.js')(app, db);
  require('./routes/read.js')(app, db);
  require('./routes/add.js')(app, db);
  require('./routes/auth.js')(app, db);
});
