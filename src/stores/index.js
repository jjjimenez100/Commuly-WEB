import { types } from 'mobx-state-tree';

const rootStore = types.model('root', {});
const store = rootStore.create({});

export default store;
