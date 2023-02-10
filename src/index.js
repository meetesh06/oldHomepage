import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";
import store from './store';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <div>Hello world!</div>,
//   },
// ]);


ReactDOM.render(
  <Provider store={store}>
    {/* <BrowserRouter basename={process.env.PUBLIC_URL}> */}
      <App />
    {/* </BrowserRouter> */}
  </Provider>,
  document.getElementById('root')
);
