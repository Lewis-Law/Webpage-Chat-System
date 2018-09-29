/*
module.exports = function (app, db) {
  app.get('/api/add', (req, res) => {
    //localhost:3000/api/add?id=1&name=newproduct&price=$41&type=newtype&description=newdescription
    var pId = req.query.id;
    pId = parseInt(pId);
    var pName = req.query.name;
    var pPrice = req.query.price;
    var pType = req.query.type;
    var pDescription = req.query.description;
    var query = {};
    
    var myobj = { id: pId, name: pName, price: pPrice, type: pType, description: pDescription };
    db.collection("Products").insertOne(myobj, function (err, result2) {
      if (err) throw err;
      console.log(myobj);
      res.send(result2);
    });
    
  });
}
*/
module.exports = function (app, db) {
  app.get('/api/add', (req, res) => {
    var uname = req.query.username;
    var upwd = req.query.password;

    var myobj = { username: uname, upwd: upwd };
    db.collection('users').insertOne(myobj, function (err, result2) {
      if (err) throw err;
      console.log(myobj);
      res.send(result2);
    });

  });
}
