import fs from 'fs';
import Handlebars from 'handlebars';
import Mn from 'backbone.marionette';

const templateString = fs.readFileSync(__dirname + '/template.hbs', 'utf8');
const template = Handlebars.compile(templateString);

export default Mn.View.extend({
  template,

  ui: {
    input: 'input'
  },

  triggers: {
    'change @ui.input': 'change:value'
  },

  modelEvents: {
    'change:growth_type': 'onModelChangeGrowthType'
  },

  onBeforeRender() {
    this.hideIfLinearGrowth();
  },

  onChangeValue(v, event) {
    this.model.set('growth_type_exp_multiplier', +this.ui.input.val());
  },

  onModelChangeGrowthType(model, value) {
    this.hideIfLinearGrowth();
  },

  hideIfLinearGrowth() {
    this.$el[this.model.get('growth_type') == 1 ? 'hide' : 'show']();
  }
});