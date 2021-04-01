import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'assets/scss/material-kit-react.scss?v=1.9.0';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import theatreReducer from './Home/components/Store/TheatreReducer';
import movieReducer from './Home/components/Store/MovieReducer';
import screenReducer from './Home/components/Store/ScreenReducer';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
  theatre: theatreReducer,
  movie: movieReducer,
  screen: screenReducer,
});

// pages for this product
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
