module.exports = function (app, db) {
  app.post('/api/user/reg', (req, res) => {
    var uname = req.body.username;
    var upwd = req.body.password;
    var uemail = req.body.email;
    var urole = req.body.role;
    var myobj = { username: uname, upwd: upwd, email: uemail, role: urole };
    var isUser = 0;

    var query = { username:uname };
    db.collection('users').find(query).toArray(function (err, result) {
      if (err) throw err;
      console.log(result.length);
      isUser = result.length;

      if (isUser == 0) {
        db.collection('users').insertOne(myobj, function (err, result2) {
          if (err) throw err;
          console.log(result2);
          res.send(true);
        });
      } else {
        console.log(isUser);
        res.send(false);
      }
    });
  });
}
