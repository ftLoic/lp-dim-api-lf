var express = require('express');
var router = express.Router();

// Controller
var artist_controller = require('../controllers/artist');

router.get('/', artist_controller.getAll);

router.get('/:id', artist_controller.getById);

router.post('/', artist_controller.create);

router.put('/:id', artist_controller.update);

router.delete('/:id', artist_controller.delete);

module.exports = router;