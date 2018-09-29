module.exports = function (app, db) {
  app.get('/api/read', (req, res) => {
    var collectionName = req.query.name; 
    var query = {};
    db.collection(collectionName).find(query).toArray(function (err, result) {
      if (err) throw err;
      console.log(result.length+1);
      res.send(result);
    });
  });
}
