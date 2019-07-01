const express = require("express");
const http = require("http");
const path = require("path");
let fetch = require("node-fetch");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET", "OPTIONS");
  next();
});

app.get("/api/channels", (req, res) => {
  fetch(`https://www.lrt.lt/static/tvprog/tvprog.json`)
    .then(res => res.json())
    .then(data => {
      const channels = [];

      for (let i in data.tvprog.items) {
        let item = data.tvprog.items[i];
        let urlIndex = item.href.lastIndexOf("/") + 1;
        channels.push({
          name: item.href.substr(urlIndex).toUpperCase(),
          title: item.title,
          description: item.desc,
          time_start: item.time_start,
          time_end: item.time_end,
          href: item.href
        });
      }

      res.status(200).json({
        message: "Channels feteched successfully",
        channels: channels
      });
    })
    .catch(err => {
      console.log(err);
    });
});

// App Deployment
app.use(express.static(__dirname + "/dist/lrt-rest-api"));

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname + "/dist/lrt-rest-api/index.html"));
});

const port = process.env.PORT || 3000;

app.set('port', port);
const server = http.createServer(app);

server.listen(port);

