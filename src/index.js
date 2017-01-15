import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
// import persistState from 'redux-localstorage';
import rootReducer from './reducers/index.js';
import App from './components/App.js';
import './sass/exports/default.scss';

require('isomorphic-fetch');


//  break off into own module
//  returns true if given lastFetched has been in the last given # of mins
const minutesSince = (lastFetched, mins) => {
  const minsInMilliseconds = mins * 60 * 1000;
  return Date.now() - lastFetched >= minsInMilliseconds;
};

const getPreviousState = () => {
  let appState = localStorage.getItem('redux');
  if (appState) {
    appState = JSON.parse(appState);
    if (minutesSince(appState.videos.lastFetched, 1)) {
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
    // persistState(),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

//  if !process.env.PRODUCTION
window.state = store.getState();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#app')
);
