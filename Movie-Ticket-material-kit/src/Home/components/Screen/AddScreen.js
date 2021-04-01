import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { v4 as uuidv4 } from 'uuid';
import IconButton from '@material-ui/core/IconButton';

import { useDispatch, useSelector } from 'react-redux';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import hist from '../Theatre/hist';
import { fetchTheatre } from '../Actions/TheatreActions';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  screen: {
    margin: theme.spacing(1),
  },
}));

function AddScreen() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [theatreId, setTheatreId] = useState(0);
  const [screenName, setScreenName] = useState('');
  const [rows, setRows] = useState(0);
  const [columns, setColumns] = useState(0);
  const [theatreArr, setTheatreArr] = React.useState([]);
  const fetchTheatre = useSelector((state) => state.screen.screen);
  const theatres = useSelector((state) => state.theatre.theatres);
  const theatreIdRef = React.useRef();
  const screenNameRef = React.useRef();
  const rowsRef = React.useRef();
  const columnsRef = React.useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      if (theatreId === 0) {
        theatreIdRef.current.focus();
        throw new Error('Fill Theatre ID');
      }
      if (screenName === '') {
        screenNameRef.current.focus();
        throw new Error('Fill Screen Name');
      }
      if (rows === 0) {
        rowsRef.current.focus();
        throw new Error('Fill rows ');
      }
      if (columns === '') {
        columnsRef.current.focus();
        throw new Error('Fill columns ');
      }

      const theatre = {
        theatreId: theatreId,
        screenName: screenName,
        rows: rows,
        columns: columns,
      };
      dispatch(addScreen(screen));
      detailRedirect();
    } catch (Exception) {
      console.log(Exception.message);
    }
  };

  const detailRedirect = () => {
    if (fetchScreen.screenId !== undefined) {
      hist.push('/screen/detail/' + fetchScreen.screenId);
    }
  };
  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });
    setInputFields(newInputFields);
  };

  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      { id: uuidv4(), screenName: '', columns: 1, rows: 1 },
    ]);
  };

  const handleRemoveFields = (id) => {
    const values = [...inputFields];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setInputFields(values);
  };

  //Fetch Movie
  useEffect(() => {
    dispatch(fetchTheatres());
  }, [dispatch]);

  const handleChangeT = (event) => {
    setTheatreArr(event.target.value);
  };

  return (
    <div>
      <h3>Fill Details:</h3>
      <form
        className={classes.root}
        noValidate
        autoComplete='on'
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <Typography variant='h6'>Theatre Details:</Typography>
        <TextField
          label='Theatre Name'
          variant='outlined'
          required
          autoFocus={true}
          type='small'
          style={{ width: 155 }}
          onChange={(e) => {
            setTheatreName(e.target.value);
          }}
          inputRef={theatreNameRef}
        />
        <TextField
          label='Theatre City'
          variant='outlined'
          required
          type='small'
          style={{ width: 155 }}
          onChange={(e) => {
            setTheatreCity(e.target.value);
          }}
          inputRef={theatreCityRef}
          className={classes.screen}
        />
        <TextField
          label='Manager Name'
          variant='outlined'
          required
          type='small'
          style={{ width: 155 }}
          inputRef={managerNameRef}
          onChange={(e) => {
            setManagerName(e.target.value);
          }}
        />
        <TextField
          label='Manager Contact'
          variant='outlined'
          required
          type='small'
          style={{ width: 155 }}
          inputRef={managerContactRef}
          onChange={(e) => {
            setManagerContact(e.target.value);
          }}
        />
        <Typography variant='h6' children='p'>
          Screens Detail:<p>(Leave Blank if no Screens)</p>
        </Typography>
        {inputFields.map((inputField) => (
          <div key={inputField.id} style={{ width: '100%', padding: 5 }}>
            <TextField
              name='screenName'
              label='screenName'
              variant='outlined'
              size='small'
              type='text'
              value={inputField.screenName}
              onChange={(event) => handleChangeInput(inputField.id, event)}
              style={{ margin: '10px' }}
            />
            <TextField
              name='columns'
              label='columns'
              variant='outlined'
              size='small'
              type='number'
              value={inputField.columns}
              onChange={(event) => {
                if (event.target.value < 1) {
                  event.target.value = 1;
                }
                handleChangeInput(inputField.id, event);
              }}
              className={classes.screen}
            />
            <TextField
              name='rows'
              label='rows'
              variant='outlined'
              size='small'
              value={inputField.rows}
              type='number'
              onChange={(event) => {
                if (event.target.value < 1) {
                  event.target.value = 1;
                }
                handleChangeInput(inputField.id, event);
              }}
              className={classes.screen}
            />
            <IconButton
              disabled={inputFields.length === 1}
              onClick={() => handleRemoveFields(inputField.id)}
            >
              <RemoveIcon />
            </IconButton>
            <IconButton onClick={handleAddFields}>
              <AddIcon />
            </IconButton>
          </div>
        ))}

        <InputLabel id='mutiple-checkbox-label'>Movies:</InputLabel>
        <Select
          labelId='mutiple-checkbox-label'
          id='demo-mutiple-checkbox'
          multiple
          value={movieArr}
          onChange={handleChangeM}
          input={<Input />}
          renderValue={(selected) => 'Movies Selected: ' + selected.length}
          fullWidth={true}
          variant='outlined'
        >
          {movies.map((movie) => (
            <MenuItem
              key={movie.movieId}
              value={movie}
              style={{ overflowX: 'auto' }}
            >
              <Checkbox checked={movieArr.indexOf(movie) > -1} />
              <ListItemText
                primary={
                  movie.movieId +
                  'Name:' +
                  movie.movieName +
                  ' ,Language: ' +
                  movie.language +
                  ' ,Genre: ' +
                  movie.movieGenre +
                  ' ,Hours: ' +
                  movie.movieHours +
                  ' ,Desc: ' +
                  movie.description
                }
              />
            </MenuItem>
          ))}
        </Select>
        <br />
        <Button type='Submit' variant='contained' color='primary'>
          Submit
        </Button>
      </form>
    </div>
  );
}

export default AddScreen;
