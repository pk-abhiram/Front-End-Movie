import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'assets/scss/material-kit-react.scss?v=1.9.0';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import theatreReducer from './Home/components/Store/theatreReducer';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// pages for this product
const store = createStore(
  theatreReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
