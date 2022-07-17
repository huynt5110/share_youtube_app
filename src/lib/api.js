import axios from 'axios';

const client = axios.create();
client.defaults.headers.common['Accept'] = 'application/json';
// this baseUrl must be store in .env
client.defaults.baseURL = process.env.REACT_APP_BASE_API;

  // call every time make a request
client.interceptors.request.use((config) => {
  const { store } = require('services/store');
  const { accessToken } = store.getState().user;

  if (accessToken) {
    config.headers = {
      ...config.headers,
      'Authorization': `Bearer ${accessToken}`
    };
  }
  return config;

}, (error) => {
  return Promise.reject(error);
});

export function AuthorizedAPI(token) {
  if (token) client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return client;
};

export function POST(url, token, data, searchParams) {
  const options = {
    method: 'POST',
    url,
    data
  };

  return AuthorizedAPI(token, searchParams)(options);
};


export function GET(url, token, data) {
  const options = {
    method: 'GET',
    url,
    data
  };

  return AuthorizedAPI(token)(options);
};

export function PUT(url, token, data, searchParams) {
  const options = {
    method: 'PUT',
    url,
    data
  };

  return AuthorizedAPI(token, searchParams)(options);
};