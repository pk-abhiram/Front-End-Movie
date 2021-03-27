import Home from './Home/Home.js';
import React from 'react';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';
import Header from 'Home/components/Header/Header.js';
import HeaderLinks from 'Home/components/Header/HeaderLinks.js';
import ViewTheatre from './Home/components/Theatre/ViewTheatre';
import Body from './Home/Body';
import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/material-kit-react/views/components.js';
import classNames from 'classnames';
import DetailTheatre from './Home/components/Theatre/DetailTheatre';
import AddTheatre from './Home/components/Theatre/AddTheatre';
const useStyles = makeStyles(styles);

var hist = createBrowserHistory();

function App() {
  const classes = useStyles();
  return (
    <Router history={hist}>
      <Header
        brand='ADMIN'
        rightLinks={<HeaderLinks />}
        fixed
        color='transparent'
        changeColorOnScroll={{
          height: 300,
          color: 'white',
        }}
      />
      <Home />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <Switch>
          <Route exact path='/theatre/detail/:id' component={DetailTheatre} />
          <Route exact path='/theatre/addTheatre' component={AddTheatre} />
          <Route exact path='/theatre' component={ViewTheatre} />
          <Route exact path='/' component={Body} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
