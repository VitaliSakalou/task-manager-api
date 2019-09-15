const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const taskSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true
    },
    completed: {
      type: Boolean,
      default: false
    },
    email: {
      type: String,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid!");
        }
      }
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
      validate(value) {
        if (value === "password") {
          throw new Error("bad password");
        }
      }
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

taskSchema.pre("save", async function(next) {
  const task = this;
  if (task.isModified("password")) {
    task.password = await bcrypt.hash(task.password, 8);
    console.log(task.password);
  }
  console.log("just before saving", task);
  next();
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
