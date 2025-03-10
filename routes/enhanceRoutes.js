const express = require('express');
const { enhanceText } = require('../controllers/enhanceController');

const router = express.Router();

router.post('/enhance', enhanceText);

module.exports = router;
