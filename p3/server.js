const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const upload = multer({
  storage: multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) =>
      cb(null, Date.now() + path.extname(file.originalname))
  })
});
app.use(express.static(__dirname));
app.post('/upload', upload.single('file'), (req, res) => {
  res.send('File uploaded successfully');
});
app.listen(3000, () => console.log('Server started on port 3000'));