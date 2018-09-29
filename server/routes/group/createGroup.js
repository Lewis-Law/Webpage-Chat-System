module.exports = function (app, db) {
  app.post('/api/group/create', (req, res) => {
    var gname = req.body.groupname;
    var myobj = { GroupName: gname, User: [], Channel: [] };
    var isGroup = 0;

    var query = { username:gname };
    db.collection('groups').find(query).toArray(function (err, result) {
      if (err) throw err;
      console.log(result.length);
      isGroup = result.length;
      if (isGroup == 0) {
        db.collection('groups').insertOne(myobj, function (err, result2) {
          if (err) throw err;
          console.log(result2);
          res.send(true);
        });
      } else {
        console.log(isGroup);
        res.send(false);
      }
    });
  });
}
