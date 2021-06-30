import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom'
import './css/bootstrap.css';

ReactDOM.render(
  <BrowserRouter basename={window.location.pathname || ''}>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);