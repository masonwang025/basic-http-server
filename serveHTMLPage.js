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
