module.exports = function (app, db) {
  app.get('/api/create', (req, res) => {
    
    var collectionName = req.query.name; 


    db.createCollection(collectionName, function (err, result) {
      if (err) throw err;
      console.log("Collection created!");
      res.send(collectionName + " created!")
    });
  });
}
