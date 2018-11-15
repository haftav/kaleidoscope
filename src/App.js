import React, { Component } from 'react';
import Waterfall from './views/Waterfall';
import './styles/main.scss';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Waterfall} />
        </Switch>
      </Router>
      </div>
    );
  }
}

export default App;
