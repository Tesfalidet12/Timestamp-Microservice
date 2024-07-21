// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// Function to check if input is milliseconds
function isMilliseconds(input) {
  // Check if input is a number or a numeric string and if it is a reasonable length for milliseconds
  return !isNaN(input) && input.toString().length >= 10;
}

// Route to handle empty date parameter and return current date
app.get("/api", function (req, res) {
  let dateObj = new Date();
  let UTCDate = dateObj.toUTCString();
  let milliseconds = dateObj.getTime();
  res.status(200).json({
    unix: milliseconds,
    utc: UTCDate,
  });
});

// Route to handle date parameter
app.get("/api/:date", function (req, res) {
  let date = req.params.date;
  let dateObj;

  if (isMilliseconds(date)) {
    date = parseInt(date);
    dateObj = new Date(date);
  } else {
    dateObj = new Date(date);
  }

  if (dateObj.toString() === "Invalid Date") {
    res.status(400).json({ error: "Invalid Date" });
  } else {
    let UTCDate = dateObj.toUTCString();
    let milliseconds = dateObj.getTime();
    res.status(200).json({
      unix: milliseconds,
      utc: UTCDate,
    });
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
