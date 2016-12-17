import React from 'react';
import { render } from 'react-dom';
import './sass/exports/default.scss';

const App = () => (<div><h1 className="app-l">Hello world</h1></div>);

render(
  <App />,
  document.querySelector('#app')
);
