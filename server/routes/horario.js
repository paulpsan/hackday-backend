'use strict';

var express = require('express');
var controller = require('../controllers/horario');
var router = express.Router();

router.get('/', controller.index);
router.get("/:id", controller.show);
router.post('/', controller.create);
router.put("/:id", controller.update);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);
module.exports = router;
