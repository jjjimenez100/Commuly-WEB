import { Home, StyleGuide } from 'pages/';

export const routes = [
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
