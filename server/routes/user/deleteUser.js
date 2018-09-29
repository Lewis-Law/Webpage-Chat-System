module.exports = function (app, db) {
  app.post('/api/user/delete', (req, res) => {
    var uname = req.body.username;
    var isUser = 0;


    // search if user exist
    var query = { username: uname };
    db.collection('users').find(query).toArray(function (err, result) {
      if (err) throw err;
      isUser = result.length;
      console.log(isUser);
      if (isUser == 1) {
        db.collection("users").deleteOne(query, function (err, obj) {
          if (err) throw err;
          console.log("user deleted");
          res.send(true);
        });
      } else {
        console.log("isUser is not 1");
        res.send(false);
      }
    });
  });
}
