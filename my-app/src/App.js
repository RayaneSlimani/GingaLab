import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SrtEditor from './Component/SrtEditor.js'

class App extends Component {
  render() {
    return (
      <div className="App">
      <nav class="navbar navbar-dark bg-dark justify-content-between">
        <a class="navbar-brand text-light">SRT Editor</a>
      </nav>
      <SrtEditor/>
      </div>
    );
  }
}

export default App;
