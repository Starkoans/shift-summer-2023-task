import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import CalculateDelivery from "./components/CalculateDelivery.jsx";
import Layout from "./components/Layout.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import Account from "./components/Account.jsx";
import Profile from "./components/Profile.jsx";
import DeliveryHistory from "./components/DeliveryHistory.jsx";
import {Provider} from "react-redux";
import {store} from "./store/store.js";
import SendPhoneForm from "./components/SendPhoneForm.jsx";
import AuthForm from "./components/AuthForm.jsx";
import MainPage from './pages/MainPage.jsx'


const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children:[
            {
                element: <MainPage/>,
                path:'/'
            },
            {
                element: <AuthPage/>,
                path:'/auth',
                children:[{
                    element:<SendPhoneForm/>,
                    path:'phone'
                },
                    {
                        element:<AuthForm/>,
                        path:'otp'
                    }
                ]
            },

        ]
    },
    {
        element: <Account/>,
        path:'/account',
        children:[
            {
                element: <Profile/>,
                path:'profile',
            },
            {
                element: <DeliveryHistory/>,
                path:'history',
            }
        ]
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
          <RouterProvider router={router} />
      </Provider>
  </React.StrictMode>,
)
