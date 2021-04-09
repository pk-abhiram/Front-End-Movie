const initStat = {
  shows: [],
  loading: false,
  error: null,
  show: {},
};
const MovieReducer = (state = initStat, action) => {
  switch (action.type) {
    case 'LOADING_SHOW':
      return {
        ...state,
        loading: true,
        error: '',
      };
    case 'FETCH_SHOWS':
      return {
        ...state,
        shows: action.payload,
        loading: false,
        error: null,
      };

    case 'FETCH_SHOWID':
      return {
        ...state,
        loading: false,
        show: action.payload,
        error: '',
      };

    case 'ERROR_SHOW':
      return {
        ...state,
        loading: false,
        error: action.error.message,
      };

    default:
      return state;
  }
};
export default MovieReducer;
