module.exports = function (app, db, helpers) {
  app.post('/api/group/addUser', (req, res) => {
    var gname = req.body.groupname;
    var uname = req.body.username;
    var UserInGroup = false;
    var valid = null;
    valid = helpers.addUserToGroup(gname, uname);
    if (valid.errors.length == 0) {
      var myquery = { GroupName: gname };
      db.collection('groups').find(myquery).toArray(function (err, result) {
        if (err) throw err;
        console.log(uname);
        for (i = 0; i < result[0].User.length; i++) {
          if (result[0].User[i] == uname) {
            UserInGroup = true;
          }
        }

        if (UserInGroup == false) {
          var newresult = result[0].User
          newresult.push(uname);
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
    } else {
      res.send(false);
    }
  });
}
