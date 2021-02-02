import {
  AUTHENTICATE,
  LOGOUT,
  SET_DID_TRY_AL,
  GET_USER_INFO,
  EDIT_USER,
  RESET_PASSWORD,
  DELETE_USER,
} from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
  didTryAutoLogin: false,
  userInfo: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        didTryAutoLogin: true,
      };

    case DELETE_USER: {
      return {
        ...initialState,
        didTryAutoLogin: true,
      };
    }
    case GET_USER_INFO: {
      return {
        ...state,
        userInfo: action.user,
      };
    }
    case EDIT_USER: {
      return {
        ...state,
        userInfo: action.newUser,
      };
    }
    case RESET_PASSWORD: {
      return {
        ...state,
      };
    }
    // case SIGNUP:
    //   return {
    //     token: action.token,
    //     userId: action.userId,
    //   };
    case SET_DID_TRY_AL:
      return {
        ...state,
        didTryAutoLogin: true,
      };
    case LOGOUT:
      return {
        ...initialState,
        didTryAutoLogin: true,
      };
    default:
      return state;
  }
};
