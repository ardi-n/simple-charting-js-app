import _ from 'underscore';
import Bb from 'backbone';
import { generateForecast } from './utils';

export default Bb.Model.extend({
  urlRoot: '/predict',

  defaults: {
    growth_types_available: [
      {
        "id": 1,
        "display_name": "Linear"
      },
      {
        "id": 2,
        "display_name": "Exponential"
      }
    ],
    forecast_months_available: [6, 9, 12],
    current_date: new Date(),
    forecast_months: 6,
    growth_type: 1,
    growth_type_exp_multiplier: 1,
    current_value: 10,
    historical_values: [],
    forecast_values: [],
    forecast_value: 90,
    timeframe: 0
  },

  initialize() {
    this.on('change:timeframe', this.onChangeTimeframe);
    this.on('change:forecast_value', this.onChangeForecastValue);
    this.on('change:forecast_months', this.onChangeForecastMonths);
    this.on('change:growth_type', this.onChangeGrowthType);
    this.on('change:growth_type_exp_multiplier', this.onChangeMultiplier);
  },

  parse(resp) {
    const respAttrs = _.pick(resp, 
      'growth_types_available', 
      'forecast_months_available', 
      'forecast_months',
      'growth_type'
    );
    return Object.assign({}, 
      respAttrs,
      {
        historical_values: resp.inputs[0].graph.values,
        current_value: resp.inputs[0].value
      }
    );
  },

  onChangeGrowthType() {
    this.updateForecast();
  },

  onChangeMultiplier() {
    this.updateForecast();
  },

  onChangeTimeframe() {
    this.updateForecast();
  },

  onChangeForecastValue() {
    this.updateForecast();
  },

  onChangeForecastMonths() {
    // request
    this.fetchForecast();
  },

  fetchForecast() {
    return this.fetch({ url: this.url() + '?forecast_months=' + this.get('forecast_months') })
      .then(
        () => this.updateForecast(), 
        xhr => {
          console.error('Fetch failed. Generating forecast in the client.');
          this.set(this.parse(generateForecast(this.get('forecast_months'))));
        }
      );
  },

  updateForecast() {
    let t = this.get('timeframe') - 1;
    const forecastValues = [];
    if (t >= 0) {
      while (t > 0) {
        let v = Math.round(Math.random() * 100);
        const m = this.get('growth_type_exp_multiplier');
        if (this.get('growth_type') == 1 && m) {
          v *= m;
        }
        forecastValues.push(Math.min(100, v));
        t--;
      }
      forecastValues.push(this.get('forecast_value'));
    }
    this.set('forecast_values', forecastValues);
  }
});