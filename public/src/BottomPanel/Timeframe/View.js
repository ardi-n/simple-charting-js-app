import fs from 'fs';
import Handlebars from 'handlebars';
import Mn from 'backbone.marionette';

const templateString = fs.readFileSync(__dirname + '/template.hbs', 'utf8');
const template = Handlebars.compile(templateString);

export default Mn.View.extend({
  className: 'form-group form-group-timeframe',
  template,

  ui: {
    input: 'input'
  },

  triggers: {
    'change @ui.input': 'change:value'
  },

  modelEvents: {
    'change:forecast_months': 'onModelChangeForecastMonths'
  },

  onChangeValue(v, event) {
    this.model.set('timeframe', +this.ui.input.val());
  },

  onModelChangeForecastMonths() {
    this.render();
  }
});