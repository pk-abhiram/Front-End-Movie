import Home from './Home/Home.js';
import React from 'react';
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
import hist from './Home/components/Theatre/hist';
import UpdateTheatre from './Home/components/Theatre/UpdateTheatre';
import ViewScreen from './Home/components/Screen/ViewScreen';
import DetailScreen from './Home/components/Screen/DetailScreen';
import UpdateScreen from './Home/components/Screen/UpdateScreen';
import AddScreen from './Home/components/Screen/AddScreen';
const useStyles = makeStyles(styles);

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
          <Route exact path='/theatre/update/:id' component={UpdateTheatre} />
          <Route exact path='/theatre/addTheatre' component={AddTheatre} />
          <Route exact path='/theatre' component={ViewTheatre} />
          <Route exact path='/screen' component={ViewScreen} />
          <Route exact path='/screen/detail/:id' component={DetailScreen} />
          <Route exact path='/screen/update/:id' component={UpdateScreen} />
          <Route exact path='/screen/addScreen' component={AddScreen} />
          <Route exact path='/' component={Body} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
