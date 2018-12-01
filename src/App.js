import React, { Component } from 'react';
import Waterfall from './views/Waterfall';
import Profile from './views/Profile';
import Header from './components/Header';
import './styles/main.scss';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import _throttle from 'lodash.throttle';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrolling: false
    }

    this.handleScroll = this.handleScroll.bind(this);
    this.endScroll = this.endScroll.bind(this);
    this.throttleScroll = this.throttleScroll.bind(this);
  }
  
  componentDidMount() {
    window.addEventListener('scroll', this.throttleScroll);
  };
  
  componentWillUnmount() {
    window.removeEventListener('scroll', this.throttleScroll);
  };

  endScroll = () => {
    console.log(this.scrollTimeout);
    window.clearTimeout(this.scrollTimeout);
    console.log(this.scrollTimeout);
    this.setState({
      scrolling: true
    })
  }

  handleScroll = (e) => {
    console.log(window.pageYOffset);
    if (window.pageYOffset !== 0) {
      window.clearTimeout(this.scrollTimeout);
      console.log('here');
      this.setState({
        scrolling: true
      })
      this.scrollTimeout = setTimeout(() => {
        if (this.state.scrolling) {
          this.setState({
            scrolling: true
          }, this.endScroll())
        }
      }, 500)
    } else {
      this.setState({
        scrolling: false
      })
    }
  }

  throttleScroll = _throttle(this.handleScroll, 500);

  render() {
    return (
      <div className="App">
      <Header moving={this.state.scrolling}/>
      <Router>
        <Switch>
          <Route exact path="/" component={Waterfall} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </Router>
      </div>
    );
  }
}

export default App;
