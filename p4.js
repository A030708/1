const express = require("express");
const EventEmitter = require("events");
const app = express();
const event = new EventEmitter();
event.on("req", () => console.log("Request received"));
app.use((req, res, next) => {
  event.emit("req");
  next();
});
app.get("/", (req, res) => res.send("Hello"));
app.listen(3000, () => console.log("Server running at http://localhost:3000/"));
 
 
