import React from 'react'
import ReactDOM from 'react-dom/client'
import "./style/index.scss";
import { store, persistor } from './utils/redux/store.tsx';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Login from './components/Login/Login.tsx';
import Register from './components/Register/Register.tsx';
import Home from './components/Home/Home.tsx';
import Test from './Test.tsx';
import Dashboard from './components/Dashboard/Dashboard.tsx';
import App from './App.tsx';
import ProjectPage from './components/Project/Project.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/Home",
    element: <Home />
  },
  {
    path: "/Login",
    element: <Login />
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
