import React from 'react';
import logo from './logo.svg';
import './App.css';
import Todolist from './Todolist.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
      <Todolist></Todolist>
    </div>
  );
}

export default App;
