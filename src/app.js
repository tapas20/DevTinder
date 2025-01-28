const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Tapas Jyoti",
    lastName: "Mohanta",
    emailId: "tapas@gmail.com",
    password: "tapas@123",
  });

  try {
    await user.save();
    res.send("User added successfully....");
  } catch (err) {
    console.error(err.message);
    res.status(400).send("Error while saving user", err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connected successfully....");
    app.listen(3000, () => {
      console.log("Server is running on port 3000....");
    });
  })
  .catch((err) => {
    console.error("Error connecting to database:", err.message);
  });
