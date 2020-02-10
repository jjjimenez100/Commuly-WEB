import { Home, StyleGuide, Login, Signup } from 'pages/';
import LoggedInView from './LoggedInView';

export const loggedInRoutes = [
  {
    type: 'route',
    path: '/styles',
    component: StyleGuide,
  },
  {
    type: 'route',
    path: '/',
    component: Home,
  },
];

export const routes = [
  {
    type: 'route',
    path: '/signup',
    isPublic: true,
    component: Signup,
  },
  {
    type: 'route',
    path: '/',
    isPublic: true,
    component: Login,
  },
  {
    type: 'route',
    path: '/',
    isPublic: false,
    component: LoggedInView,
  },
];
