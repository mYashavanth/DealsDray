const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log({ msg: `MongoDB Connected` });
  } catch (error) {
    console.log({ error: error.message });
  }
};

module.exports = connectDB;
