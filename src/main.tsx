import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Login from './components/Homepage/components/Login.tsx';
import Guest from './components/Homepage/components/Guest.tsx';
import Register from './components/Homepage/components/Regsiter.tsx';
import Homepage from './components/Homepage/Homepage.tsx';
import Test from './Test.tsx';
import Dashboard from './components/Dashboard/Dashboard.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />
  },
  {
    path: "/Login",
    element: <Login />
  },
  {
    path: "/Guest",
    element: <Guest/>
  },
  {
    path: "/Register",
    element: <Register/>
  },
  {
    path: "/Test",
    element: <Test/>
  },
  {
    path: "/Dashboard/:username/:userID",
    element: <Dashboard/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
