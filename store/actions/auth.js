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
    throw new Error('Something went wrong!');
  }

  const resData = await response.json();

  dispatch({
    type: SIGNUP,
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
    throw new Error('Something went wrong!');
  }

  const resData = await response.json();

  dispatch({
    type: LOGIN,
  });
};
