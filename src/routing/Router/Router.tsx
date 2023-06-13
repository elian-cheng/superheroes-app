import ErrorPage from 'pages/ErrorPage/ErrorPage';
import FormPage from 'pages/FormPage/FormPage';
import HomePage from 'pages/HomePage/HomePage';
import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';

interface IRoute {
  title: string;
  path: string;
  element: React.ReactNode;
}

const routes: IRoute[] = [
  {
    title: 'Home',
    path: '/',
    element: <HomePage />,
  },
  {
    title: 'Form',
    path: '/form',
    element: <FormPage />,
  },
  {
    title: 'Error',
    path: '*',
    element: <ErrorPage />,
  },
];

export default class Router extends Component {
  render() {
    return (
      <>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.title}
              path={route.path}
              element={route.element}
            />
          ))}
        </Routes>
      </>
    );
  }
}
