const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  //   createdBy: {
  //     username: {
  //       type: String,
  //       required: [true, "username is required."],
  //       maxlength: [15, "username can not be more than 15 characters."],
  //     },
  //     email: {
  //       type: String,
  //       required: [true, "email is required"],
  //       maxlength: [25, "email can not be more than 25 characters long."],
  //     },
  //     password: {
  //       type: String,
  //       required: [true, "password is required"],
  //       minlength: [8, "password can not be less than 8 characters."],
  //       maxlength: [40, "password can not be more than 40 characters long."],
  //     },
  //   },
  name: {
    type: String,
    required: [true, "name is required."],
    trim: true,
    maxlength: [40, "name can not be more than 20 characters."],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("task", taskSchema);
