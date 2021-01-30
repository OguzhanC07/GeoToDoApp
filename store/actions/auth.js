import apiUrl from "../../constants/apiUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const AUTHENTICATE = "AUTHENTICATE";

export const authenticate = (userId, token) => {
  return { type: AUTHENTICATE, userId, token };
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
    dispatch(authenticate(resData.id, resData.token));
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
    console.log(resData);
    dispatch(authenticate(resData.id, resData.token));
    const expirationDate = new Date(
      new Date().getTime() + resData.expiresIn * 1000
    );
    saveDataToStorage(resData.token, resData.id, expirationDate);
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
