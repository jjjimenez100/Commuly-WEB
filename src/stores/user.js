import { types } from 'mobx-state-tree';

const User = types
  .model('User', {
    userId: types.string,
    email: types.string,
    token: types.string,
  })
  .actions(self => ({
    setUserInformation({ userId, email, token }) {
      self.userId = userId;
      self.email = email;
      self.token = token;
    },
    setToken(token) {
      self.token = token;
    },
  }));

export const store = User.create({
  userId: '',
  email: '',
  token: '',
});

export default store;
