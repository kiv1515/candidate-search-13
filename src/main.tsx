import React from 'react';
import ReactDOM from 'react-dom/client'; // for React 18+ with ReactDOM.createRoot()
import App from './App'; // Your main app component

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement); // get the root div

root.render(
  <React.StrictMode>
    <App /> {/* This is where your App.tsx is rendered */}
  </React.StrictMode>
);