export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';

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

  dispatch({
    type: SIGNUP,
    token: resData.idToken,
    userId: resData.localId,
  });
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

  dispatch({
    type: LOGIN,
    token: resData.idToken,
    userId: resData.localId,
  });
};
