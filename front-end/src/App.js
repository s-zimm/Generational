import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './components/Home'
import Navbar from './components/Navbar';
import Account from './components/Account';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route path="/account" component={Account} />
        </div>
      </Router>
    );
  }
}

export default App;
