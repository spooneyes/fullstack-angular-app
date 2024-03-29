const express = require('express');
const { UserRouter, TodoRouter } = require('./index');
const router = express.Router();

router.use('/user', UserRouter);
router.use('/todo', TodoRouter);

module.exports = router;
