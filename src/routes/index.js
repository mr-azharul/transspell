const router = require('express').Router();

router.use('/user', require("./users/user.routes"));
router.use('/translate', require("./translate/translate.routes"));

module.exports = router;