/* External packages */
import React from 'react';
import ReactDOM from 'react-dom';

/* React Custom Components */
import App from './components/app';
import Root from './Root';

ReactDOM.render(
  <Root>
    <App />
  </Root>,
  document.querySelector('#root')
);
