module.exports = function (app, db, helpers) {
  app.post('/api/channel/delete', (req, res) => {
    var gname = req.body.groupname;
    var cname = req.body.channelname;
    var isGroup = 0;

    var valid = null;
    valid = helpers.deleteChannel(gname, cname);
    if (valid.errors.length == 0) {
      var myquery = { GroupName: gname };
      db.collection('groups').find(myquery).toArray(function (err, result) {
        if (err) throw err;
        console.log("cname: " + cname);
        console.log(result);
        var newresult = result[0].Channel;
        for (i = 0; i < result[0].Channel.length; i++) {
          if (result[0].Channel[i].name == cname) {
            newresult.splice(i, 1);
            ChannelInGroup = true;
          }
        }
        console.log("ChannelInGroup: " + ChannelInGroup);

        if (ChannelInGroup == true) {
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
