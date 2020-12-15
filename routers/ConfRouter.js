'use strict';
const express = require('express');
const router = express.Router();
const controller = require('../controllers/ConfController');

router.get('/', controller.confGet);

router.get('/init', controller.initGet);

router.post('/', controller.confAdd);

router.put('/', controller.confModify);

router.delete('/', controller.confDelete);


module.exports = router;
