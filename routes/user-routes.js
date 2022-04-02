const express = require("express");
const createUser = require("../controllers/user/01-create-user");
const getUser = require("../controllers/user/02-get-user");
const uploadAvatar = require("../controllers/user/03-upload-avatar");
const changePassword = require("../controllers/user/04-change-password");
const changeName = require("../controllers/user/05-change-name");

const router = express.Router();

router.post("/create-user", createUser);
router.get("/get-user", getUser);
router.post("/upload-avatar", uploadAvatar);
router.patch("/change-password", changePassword);
router.patch("/change-name", changeName);

module.exports = {
  routes: router,
};
