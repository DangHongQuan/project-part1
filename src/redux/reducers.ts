// reducers.ts

import { LOGIN_SUCCESS, SET_USER_DATA, LOGOUT } from '../redux/type';

interface AuthState {
  isLoggedIn: boolean; // Đảm bảo rằng thuộc tính isLoggedIn đã được khai báo
  userData: any;
}

const initialState: AuthState = {
  isLoggedIn: false,
  userData: null,
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
      };
    case SET_USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        userData: null,
      };
    default:
      return state;
  }
};

export default authReducer;
