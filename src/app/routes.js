import { Login, Signup, Home } from 'pages/';
import { USER_ROLES } from '../constants/user';

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
    allowedRoles: USER_ROLES,
    component: Home,
  },
  {
    type: 'route',
    path: '/',
    isPublic: true,
    component: Login,
  },
];
