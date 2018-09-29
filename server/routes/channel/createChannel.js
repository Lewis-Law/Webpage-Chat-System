module.exports = function (app, db) {
  app.post('/api/channel/create', (req, res) => {
    var gname = req.body.groupname;
    var cname = req.body.channelname;
    var channelAdded = false;
    var ChannelInGroup = false;

    var myquery = { GroupName: gname };
    db.collection('groups').find(myquery).toArray(function (err, result) {
      if (err) throw err;
      console.log("cname: " + cname);
      for (i = 0; i < result[0].Channel.length; i++) {
        if (result[0].Channel[i].name == cname) {
          ChannelInGroup = true;
        }
      }
      console.log("ChannelInGroup: "+ChannelInGroup);
      
      if (ChannelInGroup == false) {
        var newresult = result[0].Channel
        newresult.push({ name: cname, user: [] });
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
