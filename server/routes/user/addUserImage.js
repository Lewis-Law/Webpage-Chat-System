module.exports = function (app, db) {
  app.post('/api/user/addImage', (req, res) => {
    var uname = req.body.username;
    var uimage = req.body.imagename;
    var UserExist = false;
    var myquery = { username: uname };
    var newvalues = { $set: { image: uimage } };
    console.log(newvalues);
    db.collection("users").updateOne(myquery, newvalues, function (err, result) {
      if (err) throw err;
      console.log("User updated");
      console.log(result);
      res.send(true);
    });
  });
}
