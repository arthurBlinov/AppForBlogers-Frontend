import React from 'react';
import ReactDOM from 'react-dom/client';
import createRoot from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( <Provider store={store}>
  <App />
</Provider>,);

