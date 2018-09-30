module.exports = function (app, formidable) {
  app.post('/api/image/upload', (req, res) => {
    var form = new formidable.IncomingForm({ uploadDir: './userimages'});
    form.keepExtensions = true;

    form.on('error', function (err) {
      throw err;
      res.send({
        result: 'failed',
        data: {},
        numberofImages: 0,
        message: "Cannot upload images. Error is : " + err
      });
    });

    form.on('fileBegin', function (name, file) {
      file.path = form.uploadDir + "/" + file.name;
    });

    form.on('file', function (field, file) {
      res.send({
        result: 'OK',
        data: { 'filename': file.name, 'size': file.size },
        numberofImages: 1,
        message: 'upload successful'
      });
    });

    form.parse(req);

  });
}
