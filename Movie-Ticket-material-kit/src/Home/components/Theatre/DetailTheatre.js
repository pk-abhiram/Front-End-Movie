import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { detailTheatre } from '../Actions/actions';
import { Container, Row, Col } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  root1: {
    '& > *': {
      margin: theme.spacing(1),
      width: '11ch',
    },
  },
}));

function DetailTheatre() {
  const dispatch = useDispatch();
  const theatres = useSelector((state) => state.theatre);
  const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.loading);
  let id = useParams();

  useEffect(() => {
    dispatch(detailTheatre(id.id));
  }, [dispatch, id.id]);

  const classes = useStyles();
  return (
    <Container>
      <center>
        <h2>INFO</h2>
      </center>

      <Row>
        {(loading && <Col>Loading...</Col>) || (error && <Col>{error}</Col>) || (
          <Col>
            <center>
              <form className={classes.root} noValidate autoComplete='off'>
                <TextField
                  id='standard-basic'
                  label='Theatre ID'
                  value={theatres.theatreId}
                  disabled={true}
                />
                <TextField
                  id='outlined-basic'
                  label='Theatre Name'
                  variant='outlined'
                  value={theatres.theatreName}
                  disabled={true}
                />
                <TextField
                  id='outlined-basic'
                  label='Theatre City'
                  variant='outlined'
                  value={theatres.theatreCity}
                  disabled={true}
                />
                <TextField
                  id='outlined-basic'
                  label='Manager Name'
                  variant='outlined'
                  value={theatres.managerName}
                  disabled={true}
                />
                <TextField
                  id='outlined-basic'
                  label='Manager Contact'
                  variant='outlined'
                  value={theatres.managerContact}
                  disabled={true}
                />
              </form>
              <Row>
                <Typography variant='h5' component='h6'>
                  Movie List:
                </Typography>
              </Row>
              {theatres.listOfMovies &&
                theatres.listOfMovies.map((movie) => {
                  return (
                    <div key={movie.movieId}>
                      <Row>
                        <form
                          className={classes.root1}
                          noValidate
                          autoComplete='off'
                        >
                          <TextField
                            id='outlined-size-small'
                            label='Movie ID'
                            value={movie.movieId}
                            disabled={true}
                            size='small'
                          />
                          <TextField
                            id='standard-basic'
                            label='Movie Name'
                            value={movie.movieName}
                            disabled={true}
                          />
                          <TextField
                            id='standard-basic'
                            label='Genre'
                            value={movie.movieGenre}
                            disabled={true}
                          />
                          <TextField
                            id='standard-basic'
                            label='Movie Hours'
                            value={movie.movieHours}
                            disabled={true}
                          />
                          <TextField
                            id='standard-basic'
                            label='Language'
                            value={movie.language}
                            disabled={true}
                          />
                          <TextField
                            id='standard-basic'
                            label='Desc'
                            value={movie.description}
                            disabled={true}
                          />
                        </form>
                      </Row>
                    </div>
                  );
                })}
              <Row>
                <Typography variant='h5' component='h6'>
                  Screen List:
                </Typography>
              </Row>
              {theatres.listOfScreens &&
                theatres.listOfScreens.map((screen) => {
                  return (
                    <div key={screen.screenId}>
                      <Row>
                        <form
                          className={classes.root1}
                          noValidate
                          autoComplete='off'
                        >
                          <TextField
                            id='outlined-size-small'
                            label='Screen ID'
                            value={screen.screenId}
                            disabled={true}
                            size='small'
                          />
                          <TextField
                            id='outlined-size-small'
                            label='Screen Name'
                            value={screen.screenName}
                            disabled={true}
                            size='small'
                          />
                          <TextField
                            id='outlined-size-small'
                            label='Rows'
                            value={screen.rows}
                            disabled={true}
                            size='small'
                          />
                          <TextField
                            id='outlined-size-small'
                            label='Columns'
                            value={screen.columns}
                            disabled={true}
                            size='small'
                          />
                        </form>
                      </Row>
                    </div>
                  );
                })}
            </center>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default DetailTheatre;
