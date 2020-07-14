// import http, path, filesystem
const http = require("http");
const path = require("path");
const fs = require("fs");

// http server
const server = http.createServer((req, res) => {
  // File path with ternary to check for /
  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );

  let extname = path.extname(filePath); // extension

  // check extension and set content type
  let contentType = "text/html";
  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
  }

  if (contentType == "text/html" && extname == "") filePath += ".html";

  // Read File
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == "ENOENT") {
        // file doesn't exist
        fs.readFile(
          path.join(__dirname, "public", "404.html"),
          (err, content) => {
            if (err) {
              // if there is no 404.html
              res.writeHead(404);
              res.end("404");
            }
            res.writeHead(404, {
              "Content-Type": "text/html",
            });
            res.end(content, "utf8");
          }
        );
      } else {
        // server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // file does exist
      res.writeHead(200, {
        "Content-Type": contentType,
      });
      res.end(content, "utf8");
    }
  });
});

// let env var decide port
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

/*
OLD CODE (using if else chain to handle routes):
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
*/
/*
CODE FOR serveHTMLPage:
const path = require("path");
const fs = require("fs");

// takes in relative path the html file and res object
const serveHTMLPage = (relativePath, res) => {
  fs.readFile(path.join(__dirname, relativePath), (err, content) => {
    if (err) {
      // 404 isn't handled or 404.html doesn't exist
      res.end("404! Cannot locate requested file.");
    }

    // res header of content type html
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    res.end(content);
  });
};

module.exports = serveHTMLPage;
*/
