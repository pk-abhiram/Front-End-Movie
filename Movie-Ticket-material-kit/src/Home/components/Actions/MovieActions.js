import Axios from 'axios';
export const fetchMovie = () => async (dispatch, getState) => {
  dispatch({ type: 'LOADING_MOVIE' });
  try {
    const response = await Axios.get('http://localhost:8082/movie/');
    dispatch({
      type: 'FETCH_MOVIES',
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: 'DETAIL_MOVIE', error: error });
  }
};
