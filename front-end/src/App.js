import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './components/Home'
import Navbar from './components/Navbar';
import Account from './components/Account';
import CreateBook from './components/CreateBook';
import CreateBookSuccess from './components/CreateBookSuccess';
import PromptPage from './components/PromptPage'; 

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route path="/account" component={Account} />
          <Route exact path="/book/new" component={CreateBook} />
          <Route exact path="/book/new/success" component={CreateBookSuccess} />
          <Route path="/book/prompts/:id" component={PromptPage} />
        </div>
      </Router>
    );
  }
}

export default App;
