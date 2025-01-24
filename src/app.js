const express = require("express");
const Auth = require("./middlewares/auth");

const app = express();

// Middleware
app.use("/admin", Auth);

app.get("/admin/AllData", (req, res) => {
  res.send("All Data");
});

app.get("/admin/DeleteData", (req, res) => {
  res.send("All Data Deleted");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000....");
});
