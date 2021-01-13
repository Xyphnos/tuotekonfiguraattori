'use strict';
const express = require('express');
const router = express.Router();
const controller = require('../controllers/ConfController');

router.get('/', controller.confGet);

router.get('/final', controller.confGetId);

router.get('/init', controller.initGet);

router.get('/links', controller.linksGet);

router.get('/all', controller.getAll);

router.post('/', controller.confAdd);

router.delete('/delete', controller.confDelete);


module.exports = router;
