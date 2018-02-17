import Mn from 'backbone.marionette';
import './TopPanel';
import './BottomPanel';
import Radio from 'backbone.radio';
import ChartModel from './ChartModel';
import RootView from './Root/View';

export default Mn.Application.extend({
  region: 'main',

  initialize(opts) {
    this.chartModel = new ChartModel();
  },

  onStart() {
    this.chartModel.fetch();
    const topV = Radio.request('top-panel', 'view', this.chartModel);
    const bottomV = Radio.request('bottom-panel', 'view', this.chartModel);
    const v = new RootView();
    v.showChildView('topPanel', topV);
    v.showChildView('bottomPanel', bottomV);
    this.showView(v);
  }
});