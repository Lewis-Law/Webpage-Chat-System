module.exports = function (app, db) {
  app.get('/api/update', (req, res) => {
    console.log("updating");
    //localhost:3000/api/update?id=1&name=newproduct&price=$41&type=newtype&description=newdescription
    var pId = req.query.id;
    var pName = req.query.name;
    var pPrice = req.query.price;
    var pType = req.query.type;
    var pDescription = req.query.description;
    pId = parseInt(pId);
    var myquery = { id: pId };
    var newvalues = { $set: { name: pName, price: pPrice, type: pType, description: pDescription } };
  db.collection("Products").updateOne(myquery, newvalues, function (err, result) {
    if (err) throw err;
    console.log("1 document updated");
    res.send(result);
    });
  });
}
