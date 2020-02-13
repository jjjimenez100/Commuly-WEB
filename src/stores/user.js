import { types } from 'mobx-state-tree';
import moment from 'moment-timezone';
import UserService from '../services/userService';

const User = types
  .model('User', {
    userId: types.string,
    email: types.string,
    token: types.string,
    role: types.string,
    expirationDate: types.string,
    authenticated: types.boolean,
  })
  .actions(self => ({
    setUserInformation({ userId, email, token, role, expirationDate }) {
      self.userId = userId;
      self.email = email;
      self.token = token;
      self.role = role;
      self.expirationDate = expirationDate;

      self.authenticated = true;
    },
    setToken(token) {
      self.token = token;
    },
    loginUser(userCredentials) {
      return UserService.loginUser(userCredentials);
    },
    userHasSufficientRole(allowedUserRoles = []) {
      // All user roles are allowed
      if (allowedUserRoles.length === 0) {
        return true;
      }
      return allowedUserRoles.includes(self.role);
    },
    isUserAuthenticated() {
      if (!self.token) {
        return false;
      }
      const currentTime = moment.tz();
      const expirationTime = moment.tz(new Date(self.expirationDate), 'Asia/Manila');
      const tokenIsExpired = currentTime.isBefore(expirationTime);

      return tokenIsExpired;
    },
    isUserAllowedForProtectedRoute(allowedUserRoles) {
      return self.isUserAuthenticated() && self.userHasSufficientRole(allowedUserRoles);
    },
  }));

export const store = User.create({
  userId: '',
  email: '',
  token: '',
  role: '',
  expirationDate: '',
  authenticated: false,
});

export default User;
