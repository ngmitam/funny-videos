import React from 'react';
import Home from './components/Home';
import Share from './components/Share';

const routes = [
  {
    path: '/',
    exact: false,
    main: <Home />,
  },
  {
    path: '/share',
    exact: false,
    main: <Share />,
  },
];

export default routes;
