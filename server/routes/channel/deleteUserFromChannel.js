module.exports = function (app, db) {
  app.post('/api/channel/deleteUser', (req, res) => {
    var gname = req.body.groupname;
    var cname = req.body.channelname;
    var uname = req.body.username;
    var UserInChannel = false;
    var valid = null;
    valid = helpers.deleteUserFromGroup(gname, cname, uname);
    if (valid.errors.length == 0) {
      var myquery = { GroupName: gname };
      db.collection('groups').find(myquery).toArray(function (err, result) {
        if (err) throw err;
        console.log(uname);
        for (i = 0; i < result[0].Channel.length; i++) {
          if (result[0].Channel[i].name == cname) {
            for (j = 0; j < result[0].Channel[i].user.length; j++) {
              if (result[0].Channel[i].user[j] == uname) {
                console.log('user exist in channel');
                UserInChannel = true;
                var newresult = result[0].Channel;
                newresult[i].user.splice(j, 1);
                break;
              }
            }
          }
        }

        if (UserInChannel == true) {
          console.log(newresult)

          var newvalues = { $set: { Channel: newresult } };
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
