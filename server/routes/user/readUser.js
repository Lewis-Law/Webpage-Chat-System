module.exports = function (app, db) {
  app.get('/api/user/read', (req, res) => {
    var query = {};
    db.collection('users').find(query).toArray(function (err, result) {
      if (err) throw err;
      res.send(result);
    });
  });
}
