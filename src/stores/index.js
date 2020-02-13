import { types } from 'mobx-state-tree';
import user, { store as userStore } from './user';

const rootStore = types.model('root', {
  user,
});
const store = rootStore.create({
  user: userStore,
});

export default store;
