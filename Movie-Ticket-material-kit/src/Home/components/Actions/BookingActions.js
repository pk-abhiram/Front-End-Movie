import Axios from 'axios';
import { error } from 'jquery';

export const fetchTheatreByCity = () => async (dispatch, getState) => {
  dispatch({ type: 'LOADING_BOOKING' });
  try {
    const response = await Axios.get(
      'http://localhost:8082/theatre/allCity/'
    ).catch(function (error) {
      throw new Error(error.response.data.message);
    });
    if (response.status !== 200) {
      throw new error(response.status);
    }
    dispatch({
      type: 'FETCH_BOOKING',
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: 'ERROR_BOOKING', error: error });
  }
};

export const fetchTheatresInCity = (city) => async (dispatch, getState) => {
  dispatch({ type: 'LOADING_BOOKING' });
  console.log(city);
  try {
    const response = await Axios.get(
      'http://localhost:8082/theatre/city/' + city
    ).catch(function (error) {
      throw new Error(error.response.data.message);
    });
    if (response.status !== 200) {
      throw new error(response.status);
    }
    dispatch({
      type: 'FETCH_THEATRES',
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: 'ERROR_BOOKING', error: error });
  }
};
