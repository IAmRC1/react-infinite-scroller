import React from 'react';
import ReactDOM from 'react-dom';
import 'sanitize.css';
import 'bootstrap/dist/css/bootstrap.css'
import './assets/styles/custom.scss';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);