import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index.js';

import App from './components/App.js';
import './sass/exports/default.scss';

require('isomorphic-fetch');


const store = createStore(
  rootReducer,
  //  previousState...
  compose(
    applyMiddleware(
      thunk
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#app')
);
