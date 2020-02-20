import { types } from 'mobx-state-tree';
import user, { store as userStore } from './user';
import home, { store as homeStore } from './home';

const rootStore = types.model('root', {
  user,
  home,
});
const store = rootStore.create({
  user: userStore,
  home: homeStore,
});

export default store;
