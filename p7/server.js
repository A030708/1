const http = require("http");
const fs = require("fs");

http.createServer((req, res) => {

  // Serve HTML
  if (req.method === "GET" && req.url === "/") {
    fs.createReadStream("index.html").pipe(res);
  }

  // Receive JSON and print in terminal
  else if (req.method === "POST" && req.url === "/data") {
    let body = "";

    req.on("data", chunk => body += chunk);

    req.on("end", () => {
      const data = body ? JSON.parse(body) : {};

     
      console.log("Received Data:", data);

      res.writeHead(200, {"Content-Type":"application/json"});
      res.end(JSON.stringify({ message: "Data received" }));
    });
  }

  else {
    res.writeHead(404);
    res.end("Not Found");
  }

}).listen(3000, () => console.log("Server running at http://localhost:3000"));


//postman post method   http://localhost:3000/data   body/json/ { name: 'john', course: 'MCA' }