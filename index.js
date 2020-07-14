// import http, path, filesystem
const http = require("http");
const path = require("path");
const fs = require("fs");
const serveHTMLPage = require("./serveHTMLPage");

// http server
const server = http.createServer((req, res) => {
  // homepage
  if (req.url === "/") {
    serveHTMLPage(path.join("public", "index.html"), res); // want to load homepage
  } else if (req.url === "/about") {
    serveHTMLPage(path.join("public", "about.html"), res); // want to load about page
  } else if (req.url === "/api/users") {
    // JSON API request
    const users = [
      { name: "Mason Wang", age: 15 },
      { name: "Also Mason", age: 15 },
    ];
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  } else {
    serveHTMLPage(path.join("public", "404.html"), res); // serve 404 page
  }
});

// let env var decide port
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
