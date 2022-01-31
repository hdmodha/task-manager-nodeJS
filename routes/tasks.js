const express = require("express");
const router = express.Router();
const authenticateMiddleWare = require("../middleware/auth");
const {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");

// router.get('/', getAllTasks)
// router.get('/:id', getTask)
// router.post('/', createTask)
// router.patch('/:id', updateTask)
// router.delete('/:id', deleteTask)

router
  .route("/")
  .get(authenticateMiddleWare, getAllTasks)
  .post(authenticateMiddleWare, createTask);
router
  .route("/:id")
  .get(authenticateMiddleWare, getTask)
  .patch(authenticateMiddleWare, updateTask)
  .delete(authenticateMiddleWare, deleteTask);

module.exports = router;
