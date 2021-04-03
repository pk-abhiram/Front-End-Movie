const initStat = {
  users: [],
  loading: false,
  error: null,
  user: {},
};

const UserReducer = (state = initStat, action) => {
  switch (action.type) {
    case 'LOADING_USER':
      return {
        ...state,
        loading: true,
        error: '',
      };

    case 'ADD_USER':
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case 'CLEAR_USER':
      return {
        ...state,
        user: {},
        loading: false,
        error: null,
      };
    case 'FETCH_USER':
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case 'ERROR_USER':
      return {
        ...state,
        loading: false,
        error: action.error.message,
      };

    default:
      return state;
  }
};
export default UserReducer;
