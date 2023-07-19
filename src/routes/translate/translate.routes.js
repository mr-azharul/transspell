const multer = require("multer");
const router = require("express").Router();
const Auth = require('../../middleware/auth');
const TranslateControllers = require('../../controllers/translate/translate.controller');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/language/list', TranslateControllers.supportedLngList);
router.post('/request/text', TranslateControllers.textTranslation);
router.post('/request/file', upload.array("files"), TranslateControllers.fileTranslation);

module.exports = router;