import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from '../services/history';
import UserReducer from './user';
import MediaReducer from './media';

const appReducer = combineReducers({
  router: connectRouter(history),
  user: UserReducer,
  media: MediaReducer
});
// eslint-disable-next-line
export default (state, action) => {
  if (action.type === 'RESET') {
    state = undefined;
  }

  return appReducer(state, action);
};
