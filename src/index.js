import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/app/Main'
import registerServiceWorker from './registerServiceWorker';
import store from './store/index';
import { Provider } from 'react-redux';
import 'bootstrap3/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';

import './index.css';
// bootstrap = require('bootstrap3/dist/js/bootstrap.min.js'),
//const jquery = require('jquery/dist/jquery.min.js'),
//      popper = require('popper.js/dist/popper.min.js'),
//      notifications = require('react-notifications/lib/Notifications.js');

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
   document.getElementById('root')
);
registerServiceWorker();
