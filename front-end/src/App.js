import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Navbar from './components/Navbar';
import BookScrollView from './components/BookScrollView';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <BookScrollView />
      </div>
    );
  }
}

export default App;
