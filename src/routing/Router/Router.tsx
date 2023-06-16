import Loader from 'components/Loader/Loader';
import HomePage from 'pages/HomePage/HomePage';
import React, { Component, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const HeroPage = lazy(() => import('pages/HeroPage/HeroPage'));
const ErrorPage = lazy(() => import('pages/ErrorPage/ErrorPage'));

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
    title: 'Hero',
    path: '/hero',
    element: <HeroPage />,
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
        <Suspense fallback={<Loader />}>
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.title}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </Suspense>
      </>
    );
  }
}
