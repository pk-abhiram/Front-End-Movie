import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import { Route, Switch, Router } from 'react-router-dom';
import Header from './Header.js';
import classNames from 'classnames';
import HeaderLinks from './HeaderLinks.js';
import hist from 'Home/components/Theatre/hist.js';
import styles from 'assets/jss/material-kit-react/views/components.js';
import { makeStyles } from '@material-ui/core/styles';
import Home from './Home.js';
import Location from './Location';
import Explore from './Explore';
const useStyles = makeStyles(styles);

function CustomerLandingPage() {
  const classes = useStyles();
  const [error, setError] = useState('');
  const { logout } = useAuth();
  const { deleteUser } = useAuth();
  var user = useAuth().currentUser;
  const history = useHistory();

  async function handleLogout() {
    setError('');

    try {
      await logout();
      history.push('/');
    } catch {
      setError('Failed to log out');
    }
  }
  async function deleteU() {
    setError('');
    try {
      await deleteUser();
      history.push('/');
    } catch {
      setError('Failed to log out');
    }
  }
  return (
    <div style={{ backgroundColor: '#000' }}>
      <Header
        brand='HOME'
        rightLinks={<HeaderLinks />}
        fixed
        color='transparent'
        changeColorOnScroll={{
          height: 300,
          color: 'white',
        }}
      />
      <Home />
      <br />
      <br />

      <Router history={hist}>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <h3>Customer</h3>
          <h3>{user.email}</h3>
          {error && error}
          <Button variant='link' onClick={deleteU}>
            Delete
          </Button>
          <Button variant='link' onClick={handleLogout}>
            Log Out
          </Button>
          <Switch>
            <Route exact path='/customer/city/:cityName' component={Explore} />
            <Route exact path='/customer' component={Location} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default CustomerLandingPage;
