import Mn from 'backbone.marionette';
import CurrentDateView from './CurrentDate/View';
import ForecastPeriodView from './ForecastPeriod/View';
import GrowthView from './Growth/View';
import MultiplierView from './Multiplier/View';
import View from './View';

const Manager = Mn.Object.extend({
  channelName: 'top-panel',
  radioRequests: {
    'view': 'getView'
  },

  getView(model) {
    const currentDateV = new CurrentDateView({ model });
    const forecastPeriodV = new ForecastPeriodView({ model });
    const growthV = new GrowthView({ model });
    const multiplierV = new MultiplierView({ model });
    const v = new View();
    v.showChildView('currentDate', currentDateV);
    v.showChildView('forecastPeriod', forecastPeriodV);
    v.showChildView('growth', growthV);
    v.showChildView('multiplier', multiplierV);
    return v;
  }
});

export default new Manager();