  db.collection("users").drop(function (err, delOK) {
    console.log('indelete 2');
    if (err) throw err;
    if (delOK) console.log("Collection deleted");
    client.close();
  });
