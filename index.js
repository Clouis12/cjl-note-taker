// i am importing modules for app
const fs = require("fs");
const express = require("express");
var bodyParser = require("body-parser");
// i am creating a variable call app setting it equal to an eapress app
const app = express();
app.use(express.static("./public"));
app.use(bodyParser.json());
// i am creating a variable that is equal to port "8080"
const port = process.env.PORT || 8080;
// confinguring a a get request for notes.html
app.get("/notes", (req, res) => {
  res.sendFile("public/notes.html", { root: __dirname });
});
// configuring a get route for the app
app.get("/api/notes", (req, res) => {
  let rawdata = fs.readFileSync("./db/db.json");
  const jsonDataFile = JSON.parse(rawdata);
  res.json(jsonDataFile);
});
// configuring a post api route
app.post("/api/notes", (req, res) => {
  console.log(req.body);
  const newNote = req.body;
  let rawdata = fs.readFileSync("./db/db.json");
  const jsonDataFile = JSON.parse(rawdata);
  jsonDataFile.push(newNote);
  const newDataFile = fs.writeFileSync(
    "./db/db.json",
    JSON.stringify(jsonDataFile)
  );
  res.status(200).json({ message: "Success: we saved yo data!" });
});
// configuring a get request for application
app.get("*", (req, res) => {
  res.sendFile("public/index.html", { root: __dirname });
});

// connecting our app to a port to listen for incomimng request
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
