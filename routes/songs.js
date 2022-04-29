var express = require('express');
var router = express.Router();

// Controller
var song_controller = require('../controllers/song');

router.get('/', song_controller.getAll);

router.get('/:id', song_controller.getById);

router.post('/', song_controller.create);

router.put('/:id', song_controller.update);

router.delete('/:id', song_controller.delete);

module.exports = router;