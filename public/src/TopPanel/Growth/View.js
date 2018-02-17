import fs from 'fs';
import Handlebars from 'handlebars';
import Mn from 'backbone.marionette';

const templateString = fs.readFileSync(__dirname + '/template.hbs', 'utf8');
const template = Handlebars.compile(templateString);

export default Mn.View.extend({
  template,

  ui: {
    select: 'select'
  },

  triggers: {
    'change @ui.select': 'change:value'
  },

  onChangeValue(v, event) {
    this.model.set('growth_type', +this.ui.select.val());
  }
});