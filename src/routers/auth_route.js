const express = require('express');
const router = express.Router();
const { signup, signin, getUserByID, getAllUsers, deleteUserByID, updateUserByID } = require("../controller/auth_controller");
const { signinRequire, adminRequire } = require('../controller/common_middleware/common_middleware');


router.post('/signin', signin);
router.post('/signup', signup);
router.get('/users', signinRequire, adminRequire, getAllUsers);
router.get('/user/:id', signinRequire, getUserByID);
router.put('/user/:id', signinRequire, updateUserByID);
router.delete('/user/:id', signinRequire, deleteUserByID);

module.exports = router;