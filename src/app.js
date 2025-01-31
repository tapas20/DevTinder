const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User added successfully....");
  } catch (err) {
    console.error(err.message);
    res.status(400).send("Error while saving user", err.message);
  }
});

// find user by emailId
app.get("/users", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// find one user by emailId
app.get("/userone", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const users = await User.findOne({ emailId: userEmail });
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// find user by id
app.get("/user", async (req, res) => {
  const userId = req.body._id;
  try {
    const user = await User.findById({ _id: userId });
    res.send(user);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// find all the users
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// find by Id and Delete
app.delete("/user", async (req, res) => {
  const userId = req.body.userid;
  try {
    // const user = await User.findByIdAndDelete({_id:userId});
    const user = await User.findByIdAndDelete(userId);

    res.send("User Deleted Successfully.");
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

// update data of the user
app.patch("/user", async (req, res) => {
  const userId = req.body.userid;
  const updateData = req.body;
  try {
    const user = await User.findByIdAndUpdate({ _id: userId }, updateData);
    // const user = await User.findByIdAndUpdate(userId, updateData);
    res.send("User Updated Successfully.");
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

// Find user by emailId and update
app.patch("/useremail", async (req, res) => {
  const userEmail = req.body.emailId;
  const updateData = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { emailId: userEmail },
      updateData
    );
    res.send("User Updated Successfully");
  } catch (error) {
    res.status(400).send("Something went wrong");
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
