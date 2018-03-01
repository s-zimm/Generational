import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from'./components/Routing/PrivateRoute';

import Home from './components/Home'
import Navbar from './components/Navbar';
import Account from './components/Account';
import CreateBook from './components/CreateBook';
import CreateBookSuccess from './components/CreateBookSuccess';
import PromptPage from './components/PromptPage';
import Login from './components/Routing/Login';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route exact path='/login' component={Login}/>
          <PrivateRoute path="/account" component={Account} />
          <PrivateRoute exact path="/book/new" component={CreateBook} />
          <PrivateRoute path="/book/new/success" component={CreateBookSuccess} />
          <PrivateRoute path="/book/prompts/:id" component={PromptPage} />
        </div>
      </Router>
    );
  }
}

export default App;
