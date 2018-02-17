var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const forecast_months = parseInt(req.query.forecast_months || 6);
  const values = [];
  let k = forecast_months;
  while (k > 0) {
    values.push(Math.round(Math.random() * 100));
    k--;
  }
  res.json({
    "growth_types_available": [
      {
      "id": 1,
      "display_name": "Linear"
      },
      {
      "id": 2,
      "display_name": "Exponential"
      }
    ],
    "forecast_months_available" : [ 6, 9, 12 ],
    forecast_months,
    "growth_type": 1,
    "inputs": [
      {
        "id": 1,
        "type": "number",
        "value": Math.round(Math.random() * 100),
        "min": 0,
        "max": 100,
        "graph": {
          values
        }
      }
    ]
  });
});

module.exports = router;
