import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Account from './components/Account.jsx';
import AuthForm from './components/AuthForm/AuthForm.jsx';
import DeliveryHistory from './components/DeliveryHistory.jsx';
import Layout from './components/Header/Layout.jsx';
import Profile from './components/Profile/Profile.jsx';
import SendPhoneForm from './components/SendPhoneForm/SendPhoneForm.jsx';
import './index.css';
import AuthPage from './pages/AuthPage.jsx';
import MainPage from './pages/MainPage.jsx';
import { store } from './store/store.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        element: <MainPage />,
        path: '/',
      },
      {
        element: <AuthPage />,
        path: '/auth',
        children: [
          {
            element: <SendPhoneForm />,
            path: 'phone',
          },
          {
            element: <AuthForm />,
            path: 'otp',
          },
        ],
      },
    ],
  },
  {
    element: <Account />,
    path: '/account',
    children: [
      {
        element: <Profile />,
        path: 'profile',
      },
      {
        element: <DeliveryHistory />,
        path: 'history',
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
