import { LOGIN_SUCCESS, SET_USER_DATA, LOGOUT } from '../redux/type';

export const loginSuccess = () => ({
  type: LOGIN_SUCCESS,
});

export const setUserData = (userData: any) => ({
  type: SET_USER_DATA,
  payload: userData,
});
export const logout = () => ({
    type: LOGOUT,
  });