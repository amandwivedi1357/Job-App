import api from '../../utils/api';
import { USER_REGISTER_SUCCESS, USER_LOGIN_SUCCESS, USER_LOGOUT } from './userActionTypes';

export const register = (userData) => async (dispatch) => {
  try {
    const res = await api.post('/users/register', userData);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const login = (userData) => async (dispatch) => {
  try {
    const res = await api.post('/users/login', userData);
    console.log(res)
    dispatch({ type: USER_LOGIN_SUCCESS, payload: res.data });
    return {
      status: res.status,
      data: res.data,
    };
  } catch (err) {
    console.error(err);
    return {
      status: err.response ? err.response.status : 500, // Fallback to 500 if no response
      message: err.response ? err.response.data.message : "An error occurred",
    };
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: USER_LOGOUT });
};