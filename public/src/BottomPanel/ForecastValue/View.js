import fs from 'fs';
import Handlebars from 'handlebars';
import Mn from 'backbone.marionette';

const templateString = fs.readFileSync(__dirname + '/template.hbs', 'utf8');
const template = Handlebars.compile(templateString);

export default Mn.View.extend({
  className: 'form-group form-group-forecast-value',
  template,

  ui: {
    input: 'input'
  },

  triggers: {
    'change @ui.input': 'change:value'
  },

  onChangeValue(v, event) {
    this.model.set('forecast_value', +this.ui.input.val());
  }
});