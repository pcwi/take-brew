import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const apiUrl = process.env.REACT_APP_API_URL!!
  const [message, setMessage] = useState("")
  useEffect(() => {
    
    fetch(apiUrl)
        .then(response => response.text())
        .then(text => setMessage(text))
// empty dependency array means this effect will only run once (like componentDidMount in classes)
}, []);


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>
         Response from {process.env.REACT_APP_API_URL}
        </p>
        <p>
         {message}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
