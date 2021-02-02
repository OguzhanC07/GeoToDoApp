import apiUrl from "../../constants/apiUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Profile from "../../models/profile";

export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const GET_USER_INFO = "GET_USER_INFO";
export const EDIT_USER = "EDIT_USER";
export const RESET_PASSWORD = "RESET_PASSWORD";
export const DELETE_USER = "DELETE_USER";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
export const SET_DID_TRY_AL = "SET_DID_TRY_AL";

let timer;

export const deleteUser = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    try {
      const response = await fetch(apiUrl.baseUrl + `profile/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Ooops Bir şeyler ters gitti");
      }

      dispatch({
        type: DELETE_USER,
      });
    } catch (error) {}
  };
};

export const GetUserInfo = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    try {
      const response = await fetch(apiUrl.baseUrl + `profile/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("oops bir şeyler ters gitti");
      }

      const resData = await response.json();

      const loadedUser = resData;

      dispatch({
        type: GET_USER_INFO,
        user: loadedUser,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const resetPassword = (id, oldpassword, password, passwordconfirm) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const token = getState().auth.token;
    if (password != passwordconfirm) {
      throw new Error("Şifreler birbiriyle uyuşmuyor");
    }

    try {
      const response = await fetch(
        apiUrl.baseUrl + `profile/resetPassword/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id: id,
            oldpassword: oldpassword,
            password: password,
          }),
        }
      );

      if (!response.ok) {
        const errorResData = await response.json();
        const errorType = errorResData.errorType;

        if (errorType == "PASSWORD_IS_NOT_CORRECT") {
          throw new Error("Girdiğin şifre hatalı. Lütfen doğru şifreyi gir.");
        }
      }

      dispatch({
        type: RESET_PASSWORD,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const editUser = (id, email, username, surname, name) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const token = getState().auth.token;
    try {
      const response = await fetch(apiUrl.baseUrl + `profile/${userId}`, {
        method: "Put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: id,
          email: email,
          username: username,
          name: name,
          surname: surname,
        }),
      });

      if (!response.ok) {
        const errorResData = await response.json();
        const errorType = errorResData.errorType;

        if (errorType == "EMAIL_IS_ALREADY_IN_USE") {
          throw new Error(
            "Yazdığın e-posta adresi kullanımda. Lütfen yeni bir e posta adresi dene"
          );
        }
      }
      const user = new Profile(id, username, email, name, surname);
      dispatch({
        type: EDIT_USER,
        newUser: user,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const setDidTryAl = () => {
  return { type: SET_DID_TRY_AL };
};

export const authenticate = (userId, token, expiryTime) => {
  return (dispatch) => {
    console.log("sanırım kusucam");
    dispatch(setLogouttimer(expiryTime));
    dispatch({ type: AUTHENTICATE, userId, token });
  };
};

export const signup = (username, email, password, name, surname) => {
  return async (dispatch) => {
    const response = await fetch(apiUrl.baseUrl + "auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        username: username,
        name: name,
        surname: surname,
      }),
    });

    if (!response.ok) {
      const errorResData = await response.json();
      const errorType = errorResData.errorType;

      if (errorType == "EMAIL_IS_ALREADY_IN_USE") {
        throw new Error(
          "Yazdığın e-posta adresi kullanımda. Lütfen yeni bir e posta adresi dene"
        );
      }
    }

    const resData = await response.json();
    dispatch(
      authenticate(
        resData.id,
        resData.token,
        parseInt(resData.expiresIn) * 1000
      )
    );
    const expirationDate = new Date(
      new Date().getTime() + resData.expiresIn * 1000
    );
    saveDataToStorage(resData.token, resData.id, expirationDate);
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(apiUrl.baseUrl + "auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (!response.ok) {
      const errorResData = await response.json();
      const errorType = errorResData.errorType;

      if (errorType == "EMAIL_OR_PASSWORD_WRONG") {
        throw new Error("E-posta veya şifre yanlış");
      }
    }

    const resData = await response.json();
    dispatch(
      authenticate(
        resData.id,
        resData.token,
        parseInt(resData.expiresIn) * 1000
      )
    );
    const expirationDate = new Date(
      new Date().getTime() + resData.expiresIn * 1000
    );
    saveDataToStorage(resData.token, resData.id, expirationDate);
  };
};

export const logout = () => {
  clearLogouttimer();
  AsyncStorage.removeItem("userData");
  return { type: LOGOUT };
};

const clearLogouttimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogouttimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token,
      userId,
      expiryDate: expirationDate.toISOString(),
    })
  );
};
