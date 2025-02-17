import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import App from 'App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App></App>
  </Provider>
);

reportWebVitals();
