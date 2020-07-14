// import http, path, filesystem
const http = require("http");
const path = require("path");
const fs = require("fs");

// http server
const server = http.createServer((req, res) => {
  // homepage
  if (req.url === "/") {
    res.end("home");
  }
});

// let env var decide port
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
