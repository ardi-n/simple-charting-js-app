import Mn from 'backbone.marionette';
import TimeframeView from './Timeframe/View';
import ForecastValueView from './ForecastValue/View';
import ChartView from './Chart/View';
import View from './View';

const Manager = Mn.Object.extend({
  channelName: 'bottom-panel',
  radioRequests: {
    'view': 'getView'
  },

  getView(model) {
    const v = new View();
    const timeframeV = new TimeframeView({ model });
    const forecastValueV = new ForecastValueView({ model });
    const chartV = new ChartView({ model });
    v.showChildView('timeframe', timeframeV);
    v.showChildView('forecastValue', forecastValueV);
    v.showChildView('chart', chartV);
    return v;
  }
});

export default new Manager();