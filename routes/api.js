const express = require('express')
const multer = require('multer')
const upload = multer({dest: 'public/'})

const router = express.Router()

const controller = require('../controllers/short_url')

router.get('/short', controller.index)
router.post('/save-short-url', controller.create)
router.get('/:short', controller.getOrginalURL)
router.post('/save-masive-short-url', controller.masiveCreate)
router.post('/save-masive-by-file', upload.single('urls'), controller.saveByFile)
module.exports = router