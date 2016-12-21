import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';
import rootReducer from './reducers/index.js';
import App from './components/App.js';
import './sass/exports/default.scss';

require('isomorphic-fetch');

const beenHalfHourOrLonger = (lastFetched) => {
  const halfHour = 1800000;
  return Date.now() - lastFetched >= halfHour;
};

const getPreviousState = () => {
  let appState = localStorage.getItem('redux');
  if (appState) {
    appState = JSON.parse(appState);
    if (beenHalfHourOrLonger(appState.videos.lastFetched)) {
      return {};
    }
    return appState;
  }
  return {};
};

const store = createStore(
  rootReducer,
  getPreviousState(),
  compose(
    applyMiddleware(
      thunk
    ),
    persistState(),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#app')
);
