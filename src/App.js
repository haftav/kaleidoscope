import React, { Component } from 'react';
import Waterfall from './views/Waterfall';
import Profile from './views/Profile';
import Header from './components/Header';
import './styles/main.scss';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrolling: false
    }

    

    this.handleScroll = this.handleScroll.bind(this);
  }

  
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  };
  
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  };

  endScroll = () => {
  
  }


  handleScroll = (e, cb) => {
    console.log(window.pageYOffset);
    if (window.pageYOffset !== 0) {
      window.clearTimeout(this.scrollTimeout)
      console.log('here');
      this.setState({
        scrolling: true
      })
  
      this.scrollTimeout = setTimeout(() => {
        if (this.state.scrolling) {
          this.setState({
            scrolling: false
          })
        }
      }, 500)
    } else {
      this.setState({
        scrolling: false
      })
    }
  }

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
