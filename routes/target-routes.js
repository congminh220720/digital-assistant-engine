const express = require('express')
const createTarget = require('../controllers/target/08-create-target')
const updateStatus = require('../controllers/target/09-update-status-task')
const getTarget = require('../controllers/target/07-get-target')
const changeNameTarget = require('../controllers/target/10-change-name-target')
const changeDuration = require('../controllers/target/11-change-duration')
const deleteTask = require('../controllers/target/12-delete-task')
const updateNameTask = require('../controllers/target/13-update-name-task')
const updatePoint = require('../controllers/target/14-update-point')
const router = express.Router()

router.post('/create-target',createTarget)
router.patch('/update-status-task',updateStatus)
router.get('/get-target',getTarget)
router.patch('/change-name-target',changeNameTarget)
router.patch('/change-duration',changeDuration)
router.patch('/update-name-task',updateNameTask)
router.patch('/update-point',updatePoint)
router.delete('/delete-task',deleteTask)

module.exports = {
    routes: router
}