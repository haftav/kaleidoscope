import React, { Component } from 'react';
import Waterfall from './views/Waterfall';
import ComponentWithSubscription from './components/ComponentWithSubscription';
import Profile from './views/Profile';
import Header from './components/Header';
import { Route, Switch } from 'react-router-dom';
import _throttle from 'lodash.throttle';
import './styles/main.scss';

const WaterfallWithSubscription = ComponentWithSubscription(Waterfall);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrolling: false
    }

    this.throttleScroll = this.throttleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.throttleScroll);
  };

  componentWillUnmount() {
    window.removeEventListener('scroll', this.throttleScroll);
  };

  endScroll = () => {
    window.clearTimeout(this.scrollTimeout);
    this.setState({
      scrolling: true
    })
  };

  handleScroll = (e) => {
    if (window.pageYOffset > 50) {
      window.clearTimeout(this.scrollTimeout);
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

  throttleScroll = _throttle(this.handleScroll, 66);

  render() {
    return (
      <div className="App">
        <Header moving={this.state.scrolling} />
          <Switch>
            <Route exact path="/" component={WaterfallWithSubscription} />
            <Route path="/profile" component={Profile} />
          </Switch>
      </div>
    );
  }
}

export default App;
