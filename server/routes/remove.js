module.exports = function (app, db) {
  app.get('/api/remove', (req, res) => {
    var pId = req.query.id
    pId = parseInt(pId)
    var myquery = { id: pId }
    db.collection("Products").deleteOne(myquery, function (err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      res.send(obj)
    });
  });
}
