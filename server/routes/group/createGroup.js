module.exports = function (app, db, helpers) {
  app.post('/api/group/create', (req, res) => {
    var gname = req.body.groupname;

    var valid = null;
    valid = helpers.createGroup(gname);
    if (valid.errors.length == 0) {
      var myobj = { GroupName: gname, User: [], Channel: [] };
      var isGroup = 0;

      var query = { GroupName: gname };
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
    } else {
      res.send(false);
    }
  });
}
