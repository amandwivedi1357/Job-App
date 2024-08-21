import { USER_REGISTER_SUCCESS, USER_LOGIN_SUCCESS, USER_LOGOUT } from './userActionTypes';

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_REGISTER_SUCCESS:
    case USER_LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        user: action.payload,
        token: action.payload.token,
      };
    case USER_LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        user: null,
        token: null,
      };
    default:
      return state;
  }
}