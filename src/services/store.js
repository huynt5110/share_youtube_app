import { applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer, createMigrate } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import thunk from 'redux-thunk';
import RootReducer from '../redux';
import { routerMiddleware } from 'connected-react-router';
import history from './history';

/**
 * Add a new migration key-value pair everytime
 * there is a change to redux states.
 *
 * IMPORTANT:
 * Once the app is deployed and being used by public,
 * DO NOT MODIFY the existing migration
 * Only add new migration with incremental number,
 * and change the 'version' number to use the latest migration
 */
const migrations = {
  0: (state) => {
    return {
      ...state,
    };
  },
};

/**
 * Update the version number to use the latest migration
 * NEVER reduce version number
 *
 * All redux states are default to be persisted,
 * blacklist the states who are not intended to be persisted
 */
const persistConfig = {
  key: 'web-app',
  version: 0,
  migrate: createMigrate(migrations, { debug: false }),
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: [
    'user'
  ]
};


export default function configureStore() {
  const store = createStore(
    persistReducer(persistConfig, RootReducer),
    applyMiddleware(routerMiddleware(history), thunk)
  );
  const persistor = persistStore(store);

  return { store, persistor };

}

export const { store, persistor } = configureStore();
if ((process.env.NODE_ENV === 'development')) {
  window.store = store;
}