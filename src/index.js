const express = require("express");
const mongoose = require("mongoose");
const routeAdmin = require("./routes/admin/index");
const routeUser = require("./routes/user/index");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/src/assest", express.static(__dirname + "/assest"));

console.log(__dirname + "/assest");

app.use("/api", routeAdmin);
app.use("/api", routeUser);

app.listen(3000, () => {
  console.log("running server on port 3000...");
});

// app.get("/", function (req, res) {
//   res.sendFile(__dirname + "/index.html");
// });

mongoose
  .connect("mongodb://localhost:27017/web-ban-banh", {
    family: 4,
  })
  .then(() => console.log("connect to database"))
  .catch((error) => console.log(error));
