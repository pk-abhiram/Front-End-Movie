import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { Container, Row } from 'react-bootstrap';
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function AddTheatre() {
  const classes = useStyles();
  const [theatreName, setTheatreName] = useState();
  const [theatreCity, setTheatreCity] = useState();
  const [managerName, setManagerName] = useState();
  const [managerContact, setManagerContact] = useState();

  useEffect(() => {
    console.log(theatreName);
    console.log(theatreCity);
    console.log(managerName);
    console.log(managerContact);
  }, [theatreName, theatreCity, managerName, managerContact]);

  return (
    <div>
      <Container>
        <h3>Fill Details:</h3>
        <form
          className={classes.root}
          noValidate
          autoComplete='off'
          onSubmit={(e) => {
            e.preventDefault();
            console.log('Submitted');
          }}
        >
          <TextField
            id='outlined-basic'
            label='Theatre Name'
            variant='outlined'
            required
            autoFocus={true}
            style={{ width: 150 }}
            onChange={(e) => {
              setTheatreName(e.target.value);
              return window.removeEventListener(e);
            }}
          />
          <TextField
            id='outlined-basic'
            label='Theatre City'
            variant='outlined'
            required
            style={{ width: 150 }}
            onChange={(e) => {
              setTheatreCity(e.target.value);
              return window.removeEventListener(e);
            }}
          />
          <TextField
            id='outlined-basic'
            label='Manager Name'
            variant='outlined'
            required
            style={{ width: 150 }}
            onChange={(e) => {
              setManagerName(e.target.value);
              return window.removeEventListener(e);
            }}
          />
          <TextField
            id='outlined-basic'
            label='Manager Contact'
            variant='outlined'
            required
            style={{ width: 150 }}
            onChange={(e) => {
              setManagerContact(e.target.value);
              return window.removeEventListener(e);
            }}
          />
          <Row>
            <Button type='Submit' variant='contained' color='primary'>
              Submit
            </Button>
          </Row>
        </form>
      </Container>
    </div>
  );
}

export default AddTheatre;
