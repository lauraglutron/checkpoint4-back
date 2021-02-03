const express = require("express");
const connection = require("./src/config");

const PORT = process.env.PORT || 5000;
const app = express();

// To connect to the Database
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Middleware to read json formatted Body request
app.use(express.json());

// app.use("/", require("./"));
// app.use("/", require("./"));

// Main route
app.get("/", (req, res) => {
  res.send("Welcome to my album application");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
