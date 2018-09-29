module.exports = function (app, db) {
  app.post('/api/channel/addUser', (req, res) => {
    var gname = req.body.groupname;
    var cname = req.body.channelname;
    var uname = req.body.username;
    var UserInChannel = false;

    var myquery = { GroupName: gname };
    db.collection('groups').find(myquery).toArray(function (err, result) {
      if (err) throw err;
      console.log(uname);
      for (i = 0; i < result[0].Channel.length; i++) {
        if (result[0].Channel[i].name == cname) {
          for (j = 0; j < result[0].Channel[i].user.length; j++) {
            console.log('loop a');
            if (result[0].Channel[i].user[j] == uname) {
              console.log('user already exist in channel');
              UserInChannel = true;
              break;
            }
          }
          
          if (UserInChannel == false) {
            console.log('loop b');
            var newresult = result[0].Channel;
            newresult[i].user.push(uname);
            console.log('new result loop')
            break;
          }
        } 
      }

      if (UserInChannel == false) {
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
  });
}
