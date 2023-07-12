const router = require("express").Router();
const Auth = require('../../middleware/auth');
const TranslateControllers = require('../../controllers/translate/translate.controller');

router.post('/request', TranslateControllers.textTranslation);

module.exports = router;