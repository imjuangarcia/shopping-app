import { AsyncStorage } from 'react-native';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

let timer;

export const authenticate = (userId, token, expiryTime) => (dispatch) => {
  dispatch(setLogoutTimer(expiryTime));
  dispatch({
    type: AUTHENTICATE,
    userId,
    token,
  });
};

export const signup = (email, password) => async (dispatch) => {
  const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCu1GPdXq8DnNGa4QwuSQ_LexonYRmZo_4', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true,
    }),
  });

  if (!response.ok) {
    const errorResData = await response.json();
    const errorId = errorResData.error.message;
    let message = 'Something went wrong!';

    if (errorId === 'EMAIL_EXIST') {
      message = 'This email is already on the system. Try Logging in instead';
    }
    throw new Error(message);
  }

  const resData = await response.json();

  dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000));
  const expirationDate = new Date((new Date().getTime() + parseInt(resData.expiresIn) * 1000));
  saveDataToStorage(resData.idToken, resData.localId, expirationDate);
};

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCu1GPdXq8DnNGa4QwuSQ_LexonYRmZo_4', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true,
    }),
  });

  if (!response.ok) {
    const errorResData = await response.json();
    const errorId = errorResData.error.message;
    let message = 'Something went wrong!';

    if (errorId === 'EMAIL_NOT_FOUND') {
      message = 'This email could not be found!';
    } else if (errorId === 'INVALID_PASSWORD') {
      message = 'This password is not valid!';
    }
    throw new Error(message);
  }

  const resData = await response.json();

  dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000));

  const expirationDate = new Date((new Date().getTime() + parseInt(resData.expiresIn) * 1000));
  saveDataToStorage(resData.idToken, resData.localId, expirationDate);
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  return {
    type: LOGOUT,
  };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = (expirationTime) => (dispatch) => {
  timer = setTimeout(() => {
    dispatch(logout());
  }, expirationTime);
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem('userData', JSON.stringify({
    token,
    userId,
    expiry: expirationDate.toISOString(),
  }));
};
