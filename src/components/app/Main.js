import React from 'react';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'; // eslint-disable-line no-unused-vars
import {NotificationContainer} from 'react-notifications';
import { Switch } from 'react-router';

import AppRoutes from './ComponentRoutes';

import Header from './Navbar';
import Home from './Home';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: null
    };
  }
  render() {
    return (
      <Router>
        <div>
          <NotificationContainer />
          <Route path="/" component={Header} />
          <Switch>
            { AppRoutes.map((props, i) => <Route key={i} {...props} />) }
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </Router>
      )
  }
}

export default Main;
