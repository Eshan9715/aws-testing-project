import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';

import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import store from './redux/store';


const container = document.getElementById("root")
const root = createRoot(container)
let persistor = persistStore(store);

root.render(
  <BrowserRouter>
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
  </BrowserRouter>,
);