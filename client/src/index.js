import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import authReducer from "./state";
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';

const persistConfig = { key: "root", storage, version: 1}; //config object for redux persist, sets root of persisted state and storage to local
const persistedReducer = persistReducer(persistConfig, authReducer); //wraps authReducer with persistReducer, intercepts state persist actions and stores them in local storage
const store = configureStore({ //creates redux store with toolkit, passes peristedReducer and and applies middleware like serializableCheck to ignore some persist actions
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}> {/*provides reduxe store to all components*/}
      <PersistGate loading={null} persistor={persistStore(store)}> {/*delays render until persisted state is loaded from storage */}
      <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

