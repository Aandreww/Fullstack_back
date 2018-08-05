const express = require('express');
const router = express.Router();
const controller = require('../controllers/analytics');

// localhost:5000/api/analytics/overview
router.get('/overview', controller.overview);

// localhost:5000/api/analytics/analytics
router.post('/analytics', controller.analytics);

module.exports = router;