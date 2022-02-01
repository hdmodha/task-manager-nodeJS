const tasks = require("../models/task");
const jwt = require("jsonwebtoken");

const getAllTasks = async (req, res) => {
  try {
    // const {username, email, password}
    const alltasks = await tasks.find({});
    res.status(200).json({ alltasks });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const getTask = async (req, res) => {
  try {
    const id = req.params.id;
    const a_task = await tasks.findOne({ _id: id });
    if (!a_task) {
      return res.status(404).json({ msg: `No task with id: ${id}` });
    }
    res.status(200).json({ a_task });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const createTask = async (req, res) => {
  try {
//     console.log(req.body.createdBy);
    const task = await tasks.create(req.body);
    res.status(201).json({ task });
    // res.json({success:true})
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const updateTask = async (req, res) => {
  const { id: taskID } = req.params;
  try {
    const task = await tasks.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).json({ msg: `No task with id ${taskID}` });
    }
    res.status(200).json({ task });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    const a_task = await tasks.findOneAndDelete({ _id: id });
    if (!a_task) {
      return res.status(404).json({ msg: `No task with id: ${id}` });
    }
    res.status(200).json({ msg: "Successfully deleted." });
  } catch (err) {
    res.sendStatus(500).json({ msg: err });
  }
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
