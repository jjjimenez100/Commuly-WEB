import { types } from 'mobx-state-tree';
import moment from 'moment-timezone';
import jwt from 'jsonwebtoken';
import UserService from '../services/userService';

const User = types
  .model('User', {
    authChange: types.boolean,
  })
  .actions(self => ({
    storeTokenToLocalStorage(token) {
      localStorage.setItem('token', token);
      self.authenticated = true;
    },
    removeTokenOnLocalStorage() {
      localStorage.removeItem('token');
    },
    loginUser(userCredentials) {
      return UserService.loginUser(userCredentials);
    },
    markAuthChange() {
      self.authChange = true;
    },
    unmarkAuthChange() {
      self.authChange = false;
    },
    verifyJWTToken() {
      const token = localStorage.getItem('token');
      if (!token) {
        return false;
      }

      const { expirationDate } = jwt.decode(token);
      const currentDate = moment.tz('Asia/Manila');

      return currentDate.isBefore(new Date(expirationDate));
    },
  }));

export const store = User.create({
  authChange: false,
});

export default User;
