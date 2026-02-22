const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = 3000;
const DIR = path.join(__dirname, "files");
app.get("/download/:filename", (req, res) => {
  const filePath = path.join(DIR, req.params.filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send("File not found");
  }
  res.download(filePath);
});
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);