const express = require('express');
const utils = require('../public/src/utils');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(utils.generateForecast(parseInt(req.query.forecast_months || 6)));
});

module.exports = router;
