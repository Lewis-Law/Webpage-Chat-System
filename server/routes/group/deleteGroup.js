module.exports = function (app, db, helpers) {
  app.post('/api/group/delete', (req, res) => {
    var gname = req.body.groupname;
    var isGroup = 0;

    var valid = null;
    valid = helpers.deleteGroup(gname);
    if (valid.errors.length == 0) {
      // search if group exist
      var query = { GroupName: gname };
      db.collection('groups').find(query).toArray(function (err, result) {
        console.log(query);
        if (err) throw err;
        isGroup = result.length;
        console.log(isGroup);
        if (isGroup == 1) {
          db.collection("groups").deleteOne(query, function (err, obj) {
            if (err) throw err;
            console.log("Group deleted");
            res.send(true);
          });
        } else {
          console.log("isGroup is not 1");
          res.send(false);
        }
      });
    } else {
      res.send(false);
    }
  });
}
