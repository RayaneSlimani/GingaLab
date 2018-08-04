import React, { Component } from 'react';
import './App.css';
import SrtEditor from './Component/SrtEditor.js'

class App extends Component {
  render() {
    return (
      <div className="App">
      <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet"/>
      <nav className="navbar navbar-dark bg-dark justify-content-between">
      {/* <img className="img img-responsive" src="./SRT-logo.png"/> */}
        <a className="navbar-brand text-light">SRT Editor</a>
      </nav>
      <SrtEditor/>
      </div>
    );
  }
}

export default App;
