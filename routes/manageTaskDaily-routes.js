const express = require("express");
const router = express.Router();
const createTaskDaily = require("../controllers/ManageDaily/17-create-manage-daily");
const updateStatusTask = require("../controllers/ManageDaily/16-update-status-task");
const addTasks = require("../controllers/ManageDaily/18-add-tasks");
const updateNameTask = require("../controllers/ManageDaily/19-update-name-taks");
const updateStartTime = require("../controllers/ManageDaily/20-update-start-time");

router.post("/create-tasks-daily", createTaskDaily);
router.patch("/update-status-task",updateStatusTask)
router.post('/add-task',addTasks)
router.patch('update-name-task',updateNameTask)
router.patch('/update-status-time',updateStartTime)

module.exports = {
  routes: router,
};
