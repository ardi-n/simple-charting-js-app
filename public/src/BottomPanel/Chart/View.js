import fs from 'fs';
import 'bootstrap/js/src/popover';
import _ from 'underscore';
import Mn from 'backbone.marionette';
import { scaleTime, scaleLinear } from 'd3-scale';
import { area, line } from 'd3-shape';
import { select } from 'd3-selection';
import { extent, max } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';

const margin = {top: 20, right: 20, bottom: 30, left: 50};


export default Mn.View.extend({
  tagName: 'div',
  template: false,

  modelEvents: {
    'change:forecast_values': 'onModelChangeForecastValues',
    'change:historical_values': 'onModelChangeHistoricalValues'
  },

  onAttach() {
    this.renderChart();
  },

  onModelChangeForecastValues() {
    this.renderChart();
  },

  onModelChangeHistoricalValues() {
    this.renderChart();
  },

  renderChart() {
    this.disposeObjects();
    this.$el.empty();
    let forecastsMonths = this.model.get('forecast_months');
    let timeframe = this.model.get('timeframe');
    const currentDate = this.model.get('current_date');
    const historicalMonths = forecastsMonths - timeframe;
    this.prepareDimensions();
    this.prepareScales();

    const svg = this.prepareSvg();

    const labels = this.prepareLabels();
    const values = this.prepareValues();

    const data = this.prepareData(labels, values);

    const data1 = data.slice(0, historicalMonths+1);
    const data2 = data.slice(historicalMonths);
    // scale the range of the data
    this.x.domain(extent(data, function(d) { return d[0]; }));
    this.y.domain([0, 100]);

    this.renderXAxis(svg, labels);
    this.renderYAxis(svg);
    this.renderHistoricalData(svg, data1);
    this.renderForecastData(svg, data2);
    this.renderCurrentValue(svg, data2);
  },

  disposeObjects() {
    this.$('.currentline').popover('dispose');
  },

  prepareDimensions() {
    const elWidth = this.$el.width();
    this.width = elWidth - margin.left - margin.right,
    this.height = elWidth * 0.52 - margin.top - margin.bottom;
  },

  prepareScales() {
    // set the ranges
    let x, y;
    this.x = x = scaleTime().range([0, this.width]);
    this.y = y = scaleLinear().range([this.height, 0]);

    // define the area
    this.valuearea = area()
        .x(function(d) { return x(d[0]); })
        .y0(this.height)
        .y1(function(d) { return y(d[1]); });

    // define the line
    this.valueline = line()
        .x(function(d) { return x(d[0]); })
        .y(function(d) { return y(d[1]); });
  },

  prepareSvg() {
    return select(this.$el[0]).append('svg')
      .attr("width", this.width + margin.left + margin.right)
      .attr("height", this.height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  },

  prepareLabels() {
    const forecastsMonths = this.model.get('forecast_months');
    const timeframe = this.model.get('timeframe');
    const currentDate = this.model.get('current_date');
    const historicalMonths = forecastsMonths - timeframe;

    const historicalLabels = 
      _.range(-historicalMonths, 0)
        .map(monthsFromCurrent => (
          new Date(currentDate)
            .setMonth(currentDate.getMonth() + monthsFromCurrent)
        ));

    const forecastLabels = 
      _.range(1, timeframe+1)
        .map(monthsFromCurrent => (
          new Date(currentDate)
            .setMonth(currentDate.getMonth() + monthsFromCurrent)
        ));

    return historicalLabels.concat(currentDate).concat(forecastLabels);
  },

  prepareValues() {
    const currentValue = this.model.get('current_value');
    const timeframe = this.model.get('timeframe');

    const historicalValues = this.model.get('historical_values').slice(timeframe);
    const forecastValues = this.model.get('forecast_values');

    return historicalValues.concat(currentValue).concat(forecastValues);
  },

  prepareData(labels, values) {
    return labels.map((label, k) => ([
      label,
      values[k]
    ]));
  },

  renderXAxis(svg, labels) {
    // add the X Axis
    svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(
        axisBottom(this.x)
          .tickFormat(function(d) {
            return new Date(d).toLocaleString("en-us", { month: "short" })[0];
          })
          .tickValues(labels)
      );
  },

  renderYAxis(svg) {
    // add the Y Axis
    svg.append("g")
      .call(
        axisLeft(this.y)
          .tickSize(-this.width)
          .tickValues([0, 20, 40, 60, 80, 100])
      );
  },

  renderHistoricalData(svg, data1) {
    // add the area
    svg.append("path")
      .data([data1])
      .attr("class", "area1")
      .attr("d", this.valuearea);

    // add the valueline path.
    svg.append("path")
      .data([data1])
      .attr("class", "line1")
      .attr("d", this.valueline);
  },

  renderForecastData(svg, data2) {
    svg.append("path")
      .data([data2])
      .attr("class", "area2")
      .attr("d", this.valuearea);

    svg.append("path")
      .data([data2])
      .attr("class", "line2")
      .attr("d", this.valueline);
  },

  renderCurrentValue(svg, data2) {
    svg.append("path")
      .data([[data2[0], [data2[0][0], 0]]])
      .attr("class", "currentline")
      .attr("d", this.valueline);

    const date = this.model.get('current_date').toLocaleString('en-us', {month: 'long', year: 'numeric'});
    this.$('.currentline').popover({
      placement: 'top',
      trigger: 'manual',
      content: `Value: ${data2[0][1]}   ${date}`
    }).popover('show');
  }
});