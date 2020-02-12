import { Login, Signup, Home } from 'pages/';

export const routes = [
  {
    type: 'route',
    path: '/signup',
    isPublic: true,
    component: Signup,
  },
  {
    type: 'route',
    path: '/dashboard',
    isPublic: false,
    component: Home,
  },
  {
    type: 'route',
    path: '/',
    isPublic: true,
    component: Login,
  },
];
