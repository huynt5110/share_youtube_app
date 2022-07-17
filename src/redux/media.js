import { POST, GET } from 'lib/api';

const endpointUrl = '/media';
// Actions
const initialState = {};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}

export function shareVideo(url) {
  return async (dispatch, _getState) => {
    const { accessToken } = _getState().user;
    const payload = {
      url,
      date: new Date(),
    };
    const result = await POST(endpointUrl, accessToken, payload).catch((e) => ({
      e,
    }));
    if (result.e) return result;
  };
}

export function fetchSharedVideos() {
  return async (dispatch, _getState) => {
    const result = await GET(endpointUrl, null).catch((e) => ({
      e,
    }));
    if (result.e) return result;
    return result.data;
  };
}
