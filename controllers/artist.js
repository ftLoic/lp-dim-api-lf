var Artist = require("../models/artist");

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

    body("genre")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Genre must be specified."),

    // Process Request
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create artist object with escaped and trimmed data
        var artist = new Artist({
            _id: req.body.id,
            name: req.body.name,
            genre: req.body.genre,
            description: req.body.description,
            image: req.body.image
        });

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            artist.save(function (err) {
                if (err) {
                    return res.status(500).json(err);
                }
                return res.status(201).json("Artist created successfully !");
            });
        }
    },
];

// Read
exports.getAll = function (req, res, next) {
    Artist.find().exec(function (err, result) {
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
            Artist.findById(req.params.id).exec(function (err, result) {
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
            Artist.findByIdAndRemove(req.params.id).exec(function (err, result) {
                if (err) {
                    return res.status(500).json(err);
                }
                return res.status(200).json("Artist deleted successfully !");
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

    body("genre")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Genre must be specified."),

    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create artist object with escaped and trimmed data
        var artist = new Artist({
            _id: req.params.id,
            name: req.body.name,
            genre: req.body.genre,
            description: req.body.description,
            image: req.body.image
        });

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            Artist.findByIdAndUpdate(req.params.id, artist, function (err, result) {
                if (err) {
                    return res.status(500).json(err);
                }
                return res.status(201).json("Artist updated successfully !");
            });
        }
    },
];
