import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { store, persistor } from './utils/redux/store.tsx';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Login from './components/Login/Login.tsx';
import Guest from './components/Homepage/components/Guest.tsx';
import Register from './components/Register/Register.tsx';
import Homepage from './components/Homepage/Homepage.tsx';
import Test from './Test.tsx';
import Dashboard from './components/Dashboard/Dashboard.tsx';
import App from './App.tsx';
import ProjectPage from './components/ProjectPage/ProjectPage.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/Homepage",
    element: <Homepage />
  },
  {
    path: "/Login",
    element: <Login />
  },
  {
    path: "/Guest",
    element: <Guest />
  },
  {
    path: "/Register",
    element: <Register />
  },
  {
    path: "/Dashboard",
    element: <Dashboard />
  },
  {
    path: "/Project/:projectName/:projectId",
    element: <ProjectPage />
  },
  {
    path: "/Test",
    element: <Test />
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>

    </PersistGate>
  </Provider>

)
