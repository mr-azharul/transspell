const router = require("express").Router();
const Auth = require('../../middleware/auth');
const Validator = require("../../middleware/validator");
const UserControllers = require('../../controllers/users/user.controller');

router.post('/login', UserControllers.userSignIn);
router.post('/signup', Validator.UserValidation, UserControllers.createUser);
router.post('/reset-password', Auth.authentication, UserControllers.resetPassword);
router.get('/details/:id', Auth.authentication, UserControllers.userDetails);

module.exports = router;