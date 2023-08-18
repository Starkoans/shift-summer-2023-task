import '@kirklin/reset-css/kirklin.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import DeliveryHistory from './components/Account/DeliveryHistory/DeliveryHistory.jsx';
import Profile from './components/Account/Profile.jsx';
import AuthForm from './components/AuthForm.jsx';
import Layout from './components/Layout.jsx';
import SendPhoneForm from './components/SendPhoneForm.jsx';
import AccountPage from './pages/AccountPage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import CheckOrderOptionsPage from './pages/CheckOrderOptionsPage.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import MainPage from './pages/MainPage.jsx';
import OrderOptionsPage from './pages/OrderOptionsPage.jsx';
import { store } from './store/store.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <MainPage />,
        path: '/',
      },
      {
        element: <OrderOptionsPage />,
        path: '/order',
      },
      {
        element: <CheckOrderOptionsPage />,
        path: 'order/check',
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
      {
        element: <AccountPage />,
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
