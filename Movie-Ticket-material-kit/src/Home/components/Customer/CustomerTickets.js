import React, { useEffect } from 'react';
import { fetchCustomerByEmail } from '../Actions/UserActions';
import { useAuth } from '../../../contexts/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import TextField from '@material-ui/core/TextField';

function CustomerTickets() {
  var user = useAuth().currentUser;
  const customer = useSelector((state) => state.user.customer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCustomerByEmail(user.email));
  }, [dispatch, user.email]);

  return (
    <div style={{ padding: '20px' }}>
      {customer &&
        customer.ticketBooking &&
        customer.ticketBooking.map((ticketBooked) => {
          return (
            <Card
              key={ticketBooked.ticketId}
              style={{ border: '2px solid', margin: '30px' }}
            >
              <CardActionArea>
                <Typography>Date:</Typography>
                <TextField
                  id='date'
                  type='date'
                  value={ticketBooked.bookingDate}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <Typography>
                  Transaction Id: {ticketBooked.transactionId}
                </Typography>
                <Typography>
                  Transaction Mode:{ticketBooked.transactionMode}
                </Typography>
                <Typography>
                  Transaction Status:{ticketBooked.transactionStatus}
                </Typography>
                <Typography>Total Cost:{ticketBooked.totalCost}</Typography>
                <Typography>
                  No Of Seats:{ticketBooked.ticket.noOfSeats}
                </Typography>
                <Typography>
                  Seats:
                  {ticketBooked.ticket.seats.map((seat) => {
                    return ' ' + seat.seatNumber + '-' + seat.type + ' ,';
                  })}
                </Typography>
              </CardActionArea>
            </Card>
          );
        })}
    </div>
  );
}

export default CustomerTickets;
