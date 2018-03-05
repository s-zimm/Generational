import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import PrivateRoute from'./components/Routing/PrivateRoute';

import Home from './components/Home'
import Navbar from './components/Navbar';
import Account from './components/Account/Account';
import CreateBook from './components/CreateBook/CreateBook';
import CreateBookSuccess from './components/CreateBook/CreateBookSuccess';
import PromptPage from './components/Prompts/PromptPage';
import Login from './components/Routing/Login';
import AllFinishedPrompts from './components/FinishedPrompts/AllFinishedPrompts';
import CheckoutPage from './components/Stripe/CheckoutPage';
import CheckoutForm from './components/Stripe/CheckoutForm';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: 1
    }
  }
  render() {
    if (this.state.currentUser) {
      return (
        <Router>
          <div className="App">
            <Navbar currentUser={this.state.currentUser} />
            <Route exact path="/" component={Home} />
            {/* <Route exact path='/login' component={Login}/> */}
            <Route exact path="/account/:userId" component={Account} />
            <Route exact path="/book/new/:userId" component={CreateBook} />
            <Route exact path="/book/new/success/:userId" component={CreateBookSuccess} />
            <Route exact path="/book/prompts/:userId/:id" component={PromptPage} />
            <Route exact path="/book/prompts/complete/:userId/:id" component={AllFinishedPrompts} />
            <Route exact path="/checkout" component={CheckoutPage}/>
          </div>
        </Router>
      );
    } else {
      return <div></div>
    }
    
  }
}

export default App;
