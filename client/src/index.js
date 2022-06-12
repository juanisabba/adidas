import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from 'react-redux'
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './redux/cartSlice'
import favoritesReducer from './redux/favoritesSlice'
import { HashRouter } from 'react-router-dom';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favoritesReducer,
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
    <Provider store={store}>
    <App />
    </Provider>
    </HashRouter>
  </React.StrictMode>
);
