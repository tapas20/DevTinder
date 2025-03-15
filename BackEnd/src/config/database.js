const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://tapasjyoti8327:fzBeUtvrQwHigZIX@namastebackend.k3ape.mongodb.net/devTinder"
  );
};

module.exports = connectDB;