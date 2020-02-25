/* eslint-disable func-names */
import { types, flow } from 'mobx-state-tree';
import UserService from 'services/userService';
import { getUserDetails } from 'utils/jwt';
import { TODO_CONTENT, SCHEDULED_CONTENT } from '../constants/card';
import { DONE_STATUS, STUCK_STATUS } from '../constants/user';

const Home = types
  .model('Home', {
    scheduledCards: types.array(types.frozen()),
    teamCards: types.array(types.frozen()),
    todoCards: types.array(types.frozen()),
    user: types.frozen(),
    currentCreateModalType: types.frozen(),
  })
  .actions(self => ({
    getCards: flow(function*() {
      try {
        const { userId } = getUserDetails();
        const { data } = yield UserService.getCardsByUser(userId);
        const { scheduledCards, teamCards, todoCards, user } = data;
        self.scheduledCards = scheduledCards;
        self.teamCards = teamCards;
        self.todoCards = todoCards;
        self.user = user;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        // handle error here
      }
    }),
    addCard(contentCardData) {
      const { scheduledCards, teamCards, todoCards, currentCreateModalType: cardType } = self;

      if (cardType === SCHEDULED_CONTENT) {
        const data = [contentCardData, ...scheduledCards];
        self.scheduledCards = data;
      } else if (cardType === TODO_CONTENT) {
        const data = [contentCardData, ...todoCards];
        self.todoCards = data;
      }

      const announcements = [contentCardData, ...teamCards];
      self.teamCards = announcements;
    },
    setCurrentCreateModalType(modalType) {
      self.currentCreateModalType = modalType;
    },
    markTodo: flow(function* markTodo(cardId, isChecked) {
      try {
        const { userId } = getUserDetails();
        const patchType = isChecked ? DONE_STATUS : STUCK_STATUS;
        const body = { cardId, patchType };
        yield UserService.markTodo(userId, body);
        const updatedTodoCards = self.todoCards.map(todoCard => {
          const { _id: id } = todoCard;
          if (id === cardId) {
            return { ...todoCard, status: patchType };
          }
          return { ...todoCard };
        });
        self.todoCards = updatedTodoCards;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        // handle error here
      }
    }),
  }));
export const store = Home.create({
  scheduledCards: [],
  teamCards: [],
  todoCards: [],
  user: null,
  currentCreateModalType: '',
});

export default Home;
