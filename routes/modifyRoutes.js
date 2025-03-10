const express = require('express');
const { modifyText } = require('../controllers/modifyController');

const router = express.Router();

router.post('/modify', modifyText);

module.exports = router;
