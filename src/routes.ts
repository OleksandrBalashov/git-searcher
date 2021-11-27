import { lazy } from 'react';

export const routes = [
  {
    name: 'Home',
    path: '/',
    exact: true,
    component: lazy(
      () => import('./views/Home') /* webpackChunkName: "HomeView" */
    ),
  },
  {
    name: 'Details',
    path: '/details/:id',
    exact: false,
    component: lazy(
      () => import('./views/Details') /* webpackChunkName: "DetailsView" */
    ),
  },
  {
    name: 'Error',
    path: '',
    exact: false,
    component: lazy(
      () => import('./views/Home') /* webpackChunkName: "HomeView" */
    ),
  },
];
