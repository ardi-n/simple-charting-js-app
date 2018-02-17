import fs from 'fs';
import Handlebars from 'handlebars';
import Mn from 'backbone.marionette';

const templateString = fs.readFileSync(__dirname + '/template.hbs', 'utf8');
const template = Handlebars.compile(templateString);

export default Mn.View.extend({
  template,

  regions: {
    currentDate: '.js-current-date-region',
    forecastPeriod: '.js-forecast-period-region',
    growth: '.js-growth-region',
    multiplier: '.js-multiplier-region',
  }
});