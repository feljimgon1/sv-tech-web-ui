import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore } from './redux/create-store';
import App from './app/App';
import './index.scss'

const initialState = window.___INITIAL_STATE__;
const store = createStore({ initialState });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
