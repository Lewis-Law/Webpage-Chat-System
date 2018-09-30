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
require('./sockets.js')(app, io);
require('./routes.js')(app, path);

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
MongoClient.connect(url, { poolSize: 10 }, function (err, client) {
  if (err) { return console.log(err) }
  const dbName = 'users';
  const db = client.db(dbName);
  //require('./routes/create.js')(app, db);
  require('./routes/read.js')(app, db);
  // users
  require('./routes/user/registerUser.js')(app, db);
  require('./routes/user/deleteUser.js')(app, db);
  require('./routes/user/readUser.js')(app, db);
  require('./routes/user/authUser.js')(app, db);

  // groups
  require('./routes/group/createGroup.js')(app, db);
  require('./routes/group/deleteGroup.js')(app, db);
  require('./routes/group/readGroup.js')(app, db);
  require('./routes/group/addUserToGroup.js')(app, db);
  require('./routes/group/deleteUserFromGroup.js')(app, db);

  //channels
  require('./routes/channel/createChannel')(app, db);
  require('./routes/channel/deleteChannel')(app, db);
  require('./routes/channel/addUserToChannel.js')(app, db);
  require('./routes/channel/deleteUserFromChannel.js')(app, db);
});
