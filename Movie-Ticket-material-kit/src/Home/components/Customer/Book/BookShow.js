import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import { fetchShowById } from '../../Actions/ShowActions';
import { detailTheatre } from '../../Actions/TheatreActions';
import { detailScreen } from '../../Actions/ScreenActions';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SeatSelection from './SeatSelection';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import InputLabel from '@material-ui/core/InputLabel';
import { useAuth } from '../../../../contexts/AuthContext';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { fetchCustomerByEmail } from '../../Actions/UserActions';
import { bookingTicket } from '../../Actions/BookingActions';
import hist from 'Home/components/Theatre/hist';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function BookShow() {
  const classes = useStyles();
  const showId = useParams();
  const dispatch = useDispatch();

  const show = useSelector((state) => state.show.show);
  const theatre = useSelector((state) => state.theatre.theatre);
  const screen = useSelector((state) => state.screen.screen);
  const customer = useSelector((state) => state.user.customer);
  const [visible, setVisible] = useState(false);
  const [child, setChild] = useState([]);
  const [seatVisible, setSeatVisible] = useState(false);
  const [total, setTotal] = useState(0);
  var user = useAuth().currentUser;
  const modePaymentRef = useRef();
  useEffect(() => {
    dispatch(fetchShowById(showId.showId));
  }, [dispatch, showId]);

  useEffect(() => {
    console.log(child);
  }, [child]);

  useEffect(() => {
    dispatch(fetchCustomerByEmail(user.email));
  }, [dispatch, user.email]);

  useEffect(() => {
    show && show.screenid && dispatch(detailScreen(show.screenid));
  }, [dispatch, show]);

  useEffect(() => {
    show && show.theatreId && dispatch(detailTheatre(show.theatreId));
  }, [show, dispatch]);

  useEffect(() => {
    var totalCost = 0;

    child.map((c) => {
      var price = 0;
      if (c < 2 * screen.columns) {
        price = 250;
      } else if (c < 5 * screen.columns) {
        price = 200;
      }
      if (c >= 5 * screen.columns) {
        price = 150;
      }

      return (totalCost += price);
    });
    setTotal(totalCost);
  }, [child, screen.columns]);

  const submitBook = (e) => {
    e.preventDefault();
    if (child.length < 1) {
      return;
    }
    var seat = [];
    var noOfSeats = child.length;
    var showGetId = showId.showId;
    var transactionMode = modePaymentRef.current.value;
    var totalCost = 0;
    var customerId = customer.customerId;
    child.map((c) => {
      var type = '';
      var price = 0;
      if (c < 2 * screen.columns) {
        type = 'GOLD';
        price = 250;
      } else if (c < 5 * screen.columns) {
        type = 'SILVER';
        price = 200;
      }
      if (c >= 5 * screen.columns) {
        type = 'ECONOMY';
        price = 150;
      }
      seat.push({ seatNumber: c, type: type, price: price });
      return (totalCost += price);
    });

    const ticket = {
      seats: seat,
      noOfSeats: noOfSeats,
    };
    const ticketBooking = {
      showId: showGetId,
      ticket: ticket,
      totalCost: totalCost,
      transactionMode: transactionMode,
    };
    console.log(customerId, ticketBooking);

    dispatch(bookingTicket(customerId, ticketBooking));
    hist.push('/customer/tickets/');
  };

  return (
    <div className={classes.root}>
      <div style={{ borderBottom: '5px solid', padding: '15px 0px 15px 0px' }}>
        {show && show.movie && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <div className={classes.paper}>
                <h2>{show.movie.movieName}</h2>
                <form className={classes.root} noValidate autoComplete='off'>
                  <TextField
                    id='standard-basic'
                    label=' Genre:'
                    value={show.movie.movieGenre}
                    style={{ margin: '10px' }}
                  />
                  <TextField
                    id='standard-basic'
                    label=' Language:'
                    value={show.movie.language}
                    style={{ margin: '10px' }}
                  />
                  <TextField
                    id='standard-basic'
                    label=' Movie Hours:'
                    value={show.movie.movieHours}
                    style={{ margin: '10px' }}
                  />
                  <TextField
                    id='standard-basic'
                    label=' Description:'
                    value={show.movie.description}
                    style={{ margin: '10px' }}
                  />
                  <TextField
                    id='standard-basic'
                    label=' Genre:'
                    value={show.movie.movieGenre}
                    style={{ margin: '10px' }}
                  />
                  <TextField
                    id='datetime-local'
                    label='Starts At:'
                    type='datetime-local'
                    value={show.showStartTime}
                    style={{ margin: '10px' }}
                  />
                  <TextField
                    id='datetime-local'
                    label='Ends At:'
                    type='datetime-local'
                    value={show.showEndTime}
                    style={{ margin: '10px' }}
                  />
                  {theatre.theatreName && (
                    <TextField
                      id='standard-basic'
                      label=' Theatre Name:'
                      value={theatre.theatreName}
                      style={{ margin: '10px' }}
                    />
                  )}
                  {theatre.theatreCity && (
                    <TextField
                      id='standard-basic'
                      label='City:'
                      value={theatre.theatreCity}
                      style={{ margin: '10px' }}
                    />
                  )}
                  {theatre.managerContact && (
                    <TextField
                      id='standard-basic'
                      label='Contact:'
                      value={theatre.managerContact}
                      style={{ margin: '10px' }}
                    />
                  )}
                </form>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div
                style={{
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'contain',

                  padding: '5px',
                }}
              >
                <img
                  src={show.movie.imageUrl}
                  className='responsive'
                  style={{
                    maxHeight: '600px',
                    maxWidth: '90%',
                    marginRight: '3%',
                    marginLeft: '3%',
                  }}
                  alt='POSTER'
                />
              </div>
            </Grid>
          </Grid>
        )}
      </div>

      <div className={classes.paper}>
        <Button
          className={classes.paper}
          onClick={() => {
            setVisible(!visible);
          }}
          variant='contained'
          color='secondary'
        >
          Book Ticket
        </Button>
      </div>

      {visible && (
        <Grid item xs={12} sm={12}>
          <div className={classes.paper}>
            <Button
              onClick={() => {
                setSeatVisible(!seatVisible);
              }}
              variant='outlined'
              color='secondary'
            >
              Select Seats:{child.join(' ')}
            </Button>
            {screen && seatVisible && (
              <Dialog
                open={seatVisible}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => {
                  setSeatVisible(!seatVisible);
                }}
                aria-labelledby='alert-dialog-slide-title'
                aria-describedby='alert-dialog-slide-description'
              >
                <SeatSelection
                  handleChange={(e) => {
                    setChild(e);
                    setSeatVisible(!seatVisible);
                  }}
                  props={{ rows: screen.rows, columns: screen.columns }}
                />
              </Dialog>
            )}
            <form className={classes.root} noValidate autoComplete='off'>
              <FormControl
                className={classes.formControl}
                style={{ width: '150px', margin: '30px' }}
              >
                <InputLabel htmlFor='uncontrolled-native'>
                  Payment Mode:
                </InputLabel>
                <NativeSelect
                  defaultValue={'CARD'}
                  inputProps={{
                    name: 'name',
                    id: 'uncontrolled-native',
                  }}
                  inputRef={modePaymentRef}
                >
                  <option value={'UPI'}>UPI</option>
                  <option value={'CARD'}>CARD</option>
                  <option value={'CASH'}>CASH</option>
                </NativeSelect>
              </FormControl>
              <InputLabel htmlFor='uncontrolled-native'>
                Total Price:
              </InputLabel>
              <FormControl>
                <TextField
                  id='standard-basic'
                  value={total}
                  disabled={true}
                  style={{ margin: '10px' }}
                />
              </FormControl>
            </form>
            <form onSubmit={submitBook}>
              <FormControl style={{ marginBottom: '35px' }}>
                <InputLabel>
                  <Button type='submit' color='secondary' variant='contained'>
                    BOOK
                  </Button>
                </InputLabel>
              </FormControl>
            </form>
          </div>
        </Grid>
      )}
    </div>
  );
}

export default BookShow;
