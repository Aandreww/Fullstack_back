const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../controllers/category');

// localhost:5000/api/category
router.get('/', passport.authenticate('jwt', {session: false}),controller.getAll);

// localhost:5000/api/category/:id
router.get('/:id', controller.getById);

// localhost:5000/api/category/:id
router.delete('/:id', controller.remove);

// localhost:5000/api/category
router.post('/', controller.create);

// localhost:5000/api/category
router.patch('/:id', controller.update);

module.exports = router;