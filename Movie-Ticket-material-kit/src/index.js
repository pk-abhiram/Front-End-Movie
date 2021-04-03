import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'assets/scss/material-kit-react.scss?v=1.9.0';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import theatreReducer from './Home/components/Store/TheatreReducer';
import movieReducer from './Home/components/Store/MovieReducer';
import screenReducer from './Home/components/Store/ScreenReducer';
import userReducer from './Home/components/Store/UserReducer';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import SimplePaper from './Home/components/signin-signup/SimplePaper';
import SimplePaper2 from './Home/components/signin-signup/Simplerpaper2';
import Demo from './Demo';
import hist from './Home/components/Theatre/hist';
import { Route, Router, Switch } from 'react-router-dom';
import CustomerLandingPage from 'Home/components/Customer/CustomerLandingPage';

const rootReducer = combineReducers({
  theatre: theatreReducer,
  movie: movieReducer,
  screen: screenReducer,
  user: userReducer,
});

// pages for this product
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        <Route path='/admin' component={App} />
        <Route path='/customer' component={CustomerLandingPage} />
        <Route path='/sign' component={SimplePaper} />
        <Route path='/login' component={SimplePaper2} />
        <Route path='/' component={Demo} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
