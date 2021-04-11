import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { detailScreen } from '../Actions/ScreenActions';
import { fetchMovie } from '../Actions/MovieActions';
import { addShow } from '../Actions/ShowActions';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from '@material-ui/core';
import { Alert } from 'react-bootstrap';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';

import hist from '../Theatre/hist';
import Select from '@material-ui/core/Select';
import { TextField } from '@material-ui/core';
import { Button, Typography } from '@material-ui/core';
import Input from '@material-ui/core/Input';

export default function AddShow() {
  const dispatch = useDispatch();
  const starttimeRef = useRef();
  const endtimeRef = useRef();
  const shownameRef = useRef();

  const [movieArr, setMovieArr] = React.useState([]);
  const [movie, setMovie] = React.useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const screen = useSelector((state) => state.screen.screen);
  let id = useParams();
  const movies = useSelector((state) => state.movie.movies);
  //Fetch Movie
  useEffect(() => {
    dispatch(fetchMovie());
  }, [dispatch]);

  useEffect(() => {
    dispatch(detailScreen(id.id));
  }, [dispatch, id.id]);

  useEffect(() => {
    console.log(movie);
  }, [movie]);

  const handleChangeM = (event) => {
    setMovieArr(event.target.value);
    setMovie(event.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      var showr = {
        showStartTime: starttimeRef.current.value,
        showEndTime: endtimeRef.current.value,
        showName: shownameRef.current.value,
        movie: movie[0],
        screenId: screen.screenId,
        theatreId: screen.theatreId,
      };
      console.log(showr);
      dispatch(addShow(showr));
      hist.push('/admin/');
    } catch {
      setError('Failed to add a show');
    }

    setLoading(false);
  }

  return (
    <div
      id='home'
      style={{ width: '500px', margin: '0 auto', padding: '30px' }}
    >
      <Card
        bg='dark'
        text='light'
        style={{
          margin: '0 auto',
          width: '100%',
          padding: '50px',
          marginTop: '50px',
        }}
      >
        <h2 className='text-center mb-4'>Add a show</h2>
        {error && <Alert variant='danger'>{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <Typography variant='h6'>Show Details:</Typography>
          <Typography variant='caption'>Start Time:</Typography>
          <TextField
            type='datetime-local'
            variant='filled'
            color='primary'
            fullWidth={true}
            inputRef={starttimeRef}
            defaultValue='2021-04-12T23:56:00'
          ></TextField>
          <Typography variant='caption'>End Time:</Typography>
          <TextField
            type='datetime-local'
            variant='filled'
            color='primary'
            fullWidth={true}
            inputRef={endtimeRef}
            defaultValue='2021-04-12T23:56:00'
          ></TextField>

          <TextField
            type='text'
            label='Show Name'
            inputRef={shownameRef}
            required
            fullWidth={true}
          />

          <Typography variant='caption'>Movies:</Typography>

          <Select
            labelId='mutiple-checkbox-label'
            id='demo-mutiple-checkbox'
            multiple
            value={movieArr}
            onChange={handleChangeM}
            input={<Input />}
            renderValue={(selected) => 'Movie Selected '}
            fullWidth={true}
            variant='outlined'
          >
            {movies.map((movie) => (
              <MenuItem
                key={movie.movieId}
                value={movie}
                style={{ overflowX: 'auto' }}
              >
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
          <Button
            disabled={loading}
            className='w-100'
            type='submit'
            color='primary'
            variant='contained'
            style={{ marginTop: '10px' }}
          >
            Add Show
          </Button>
        </form>
      </Card>
    </div>
  );
}
