import React from 'react';
import './App.css';

interface AppProps {
  message: string;
}

const App: React.FC<AppProps> = ({ message }) => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>{message}</h1>
      </header>
    </div>
  );
};

export default App;
