const express = require('express');
const { getIndex, } = require('../controllers/adminController');

const router = express.Router();

router.get("/", getIndex);

module.exports = router;