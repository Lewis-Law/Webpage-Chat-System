module.exports = function (app, db) {
  app.post('/api/group/deleteUser', (req, res) => {
    var gname = req.body.groupname;
    var uname = req.body.username;
    var UserInGroup = false;

    var myquery = { GroupName: gname };
    db.collection('groups').find(myquery).toArray(function (err, result) {
      if (err) throw err;
      console.log(uname);
      var newresult = result[0].User
      for (i = 0; i < result[0].User.length; i++) {
        if (result[0].User[i] == uname) {
          newresult.splice(i, 1);
          UserInGroup = true;
        } 
      }

      if (UserInGroup == true) {
        console.log(newresult)
        var newvalues = { $set: { User: newresult } };
        console.log(newvalues);

        db.collection("groups").updateOne(myquery, newvalues, function (err, result) {
          if (err) throw err;
          console.log("Group updated");
          res.send(true);
        });
      } else {
        res.send(false);
      }
    });
  });
}
