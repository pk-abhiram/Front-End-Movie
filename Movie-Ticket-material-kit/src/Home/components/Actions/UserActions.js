import Axios from 'axios';

export const addCustomer = (user) => async (dispatch, getState) => {
  try {
    console.log(user);
    const response = await Axios({
      method: 'post',
      url: 'http://localhost:8082/customer/',
      headers: {},
      data: {
        customerName: user.customerName,
        address: user.address,
        mobileNo: user.mobileNo,
        email: user.email,
        password: user.password,
      },
    }).catch(function (error) {
      throw new Error(error.response.data.message);
    });

    dispatch({
      type: 'ADD_USER',
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: 'ERROR_USER', error: error });
  }
};
export const clearUser = () => async (dispatch, getState) => {
  dispatch({
    type: 'CLEAR_USER',
  });
};

export const fetchUser = (email) => async (dispatch, getState) => {
  try {
    const response = await Axios({
      method: 'post',
      url: 'http://localhost:8082/user/finduser',
      headers: {},
      data: {
        email: email,
      },
    }).catch(function (error) {
      throw new Error(error.response.data.message);
    });

    dispatch({
      type: 'FETCH_USER',
      payload: response.data,
    });
  } catch (error) {
    console.log(error.message);
    dispatch({ type: 'ERROR_USER', error: error });
  }
};
