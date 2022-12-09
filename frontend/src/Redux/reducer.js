import { DELETE_USER, EDIT_USER, GET_POSTS, GET_USER, USER_LOGIN, USER_LOGOUT, USER_SIGNUP } from "./actionType";

export default function reducer(state, { type, payload }) {
  switch (type) {
    case GET_USER:
      return { ...state, users: payload };
    case GET_POSTS:
      return { ...state, posts: payload };
    case USER_LOGIN:
      return { ...state, isAuth: true,currentUser:payload };
    case USER_SIGNUP:
      return {...state,currentUser:payload}
    case USER_LOGOUT:
      return { ...state, isAuth: false };
    case DELETE_USER:
      return {...state,currentUser:{},isAuth:false}
    case EDIT_USER:
      return {...state,currentUser:payload}
    default:
      return state;
  }
}
