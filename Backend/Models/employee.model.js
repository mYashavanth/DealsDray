const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    createdate: {
      type: Date,
      default: Date.now(),
    },
    image: {
      type: String,
    },
  },
  { versionKey: false }
);

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
