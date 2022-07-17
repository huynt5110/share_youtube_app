import { POST } from 'lib/api';
const authEndpointUrl = '/authentication';
const usersEndpointUrl = '/users';

const SET_CURRENT_USER = 'SET_CURRENT_USER';
const AUTH_SIGN_OUT = 'AUTH_SIGN_OUT';

// Actions
const initialState = {
  accessToken: null,
  currentUser: null,
  isSignIn: false,
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.user,
        isSignIn: true,
        accessToken: action.token,
      };

    case AUTH_SIGN_OUT:
      return {
        ...state,
        ...initialState,
      };

    default:
      return state;
  }
}

function setCurrentUser(token, user) {
  return { type: SET_CURRENT_USER, token, user };
}

export function signOut() {
  return { type: AUTH_SIGN_OUT };
}

export function signInUser(email, password) {
  const payload = { strategy: 'local', email, password };
  return async (dispatch, _getState) => {
    const result = await POST(authEndpointUrl, null, payload).catch((e) => ({
      e,
    }));
    if (result.e) return result;
    const { accessToken, user } = result.data;
    return dispatch(setCurrentUser(accessToken, user));
  };
}

export function registerUser(email, password) {
  const payload = { email, password };
  return async (dispatch, _getState) => {
    const result = await POST(usersEndpointUrl, null, payload).catch((e) => ({
      e,
    }));
    if (result.e) return result;
  };
}
