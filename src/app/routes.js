import { Login, Signup, Home, Calendar } from 'pages/';

// use allowedRoles attribute and pass an array of roles to be permitted
// no allowedRoles property = all roles are authorized
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
    path: '/calendar',
    isPublic: false,
    component: Calendar,
  },
  {
    type: 'route',
    path: '/',
    isPublic: true,
    component: Login,
  },
];
