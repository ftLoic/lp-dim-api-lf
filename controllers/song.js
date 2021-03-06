var Song = require("../models/song");

const { param, body, validationResult } = require("express-validator");

// Create
exports.create = [
    // Check validation
    body("id")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Id must be specified.")
        .isNumeric()
        .withMessage("Id must be a number."),

    body("name")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Name must be specified.")
        .isAlpha("en-US", { ignore: " " })
        .withMessage("Name has non-alphanumeric characters."),

    body("duration")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Duration must be specified.")
        .isNumeric()
        .withMessage("Duration must be a number."),

    body("artist")
        .trim()
        .isLength({ min: 0 })
        .escape()
        .withMessage("Artist must be specified.")
        .isNumeric()
        .withMessage("Artist must be a number."),

    // Process Request
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create song object with escaped and trimmed data
        var song = new Song({
            _id: req.body.id,
            name: req.body.name,
            duration: req.body.duration,
            artist: req.body.artist,
        });

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            song.save(function (err) {
                if (err) {
                    return res.status(500).json("Error saving song to artist");
                }
                return res.status(201).json("Song created successfully !");
            });
        }
    },
];

// Read
exports.getAll = function (req, res, next) {
  Song.find().populate("artist").exec(function (err, result) {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(result);
  });
};

exports.getById = [
    param("id")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Id must be specified.")
        .isNumeric()
        .withMessage("Id must be a number."),

    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            Song.findById(req.params.id).populate("artist").exec(function (err, result) {
                if (err) {
                    return res.status(500).json(err);
                }
                return res.status(200).json(result);
            });
        }
    },
];

// Delete
exports.delete = [
    param("id")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Id must be specified.")
        .isNumeric()
        .withMessage("Id must be a number."),

    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            Song.findByIdAndRemove(req.params.id).exec(function (err, result) {
                if (err) {
                    return res.status(500).json(err);
                }
                return res.status(200).json("Song deleted successfully !");
            });
        }
    },
];

// Update
exports.update = [
    param("id")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Id must be specified.")
        .isNumeric()
        .withMessage("Id must be a number."),

    body("name")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Name must be specified.")
        .isAlpha("en-US", { ignore: " " })
        .withMessage("Name has non-alphanumeric characters."),

    body("duration")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Duration must be specified.")
        .isNumeric()
        .withMessage("Duration must be a number."),
        
    body("artist")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Artist must be specified.")
        .isNumeric()
        .withMessage("Artist must be a number."),

    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create song object with escaped and trimmed data
        var song = new Song({
            _id: req.body.id,
            name: req.body.name,
            duration: req.body.duration
        });

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            Song.findByIdAndUpdate(req.params.id, song, function (err, result) {
                if (err) {
                return res.status(500).json(err);
                }
                return res.status(201).json("Song updated successfully !");
            });
        }
    },
];
