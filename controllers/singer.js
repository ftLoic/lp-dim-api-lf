var Singer = require("../models/singer");

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

    // Create singer object with escaped and trimmed data
    var singer = new Singer({
        _id: req.body.id,
        name: req.body.name,
        genre: req.body.genre,
        description: req.body.description,
        image: req.body.image
    });

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      singer.save(function (err) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(201).json("Singer created successfully !");
      });
    }
  },
];

// Read
exports.getAll = function (req, res, next) {
  Singer.find().exec(function (err, result) {
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
      Singer.findById(req.params.id).exec(function (err, result) {
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
      Singer.findByIdAndRemove(req.params.id).exec(function (err, result) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(200).json("Singer deleted successfully !");
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

    // Create singer object with escaped and trimmed data
    var singer = new Singer({
        _id: req.params.id,
        name: req.body.name,
        genre: req.body.genre,
        description: req.body.description,
        image: req.body.image
    });

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else {
        Singer.findByIdAndUpdate(req.params.id, singer, function (err, result) {
            if (err) {
                return res.status(500).json(err);
            }
            return res.status(201).json("Singer updated successfully !");
        });
    }
  },
];
