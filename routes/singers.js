var express = require('express');
var router = express.Router();

// Controller
var singer_controller = require('../controllers/singer');

router.get('/', singer_controller.getAll);

router.get('/:id', singer_controller.getById);

router.post('/', singer_controller.create);

router.put('/:id', singer_controller.update);

router.delete('/:id', singer_controller.delete);

module.exports = router;