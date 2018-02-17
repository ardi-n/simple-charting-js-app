import _ from 'underscore';
import Bb from 'backbone';
import Mn from 'backbone.marionette';
import 'bootstrap/dist/css/bootstrap.min.css';
import './src/styles.css';

import App from './src/App';

const app = new App();
app.start();