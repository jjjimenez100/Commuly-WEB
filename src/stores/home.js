/* eslint-disable func-names */
import { types, flow } from 'mobx-state-tree';
import UserService from 'services/userService';
import { getUserDetails } from 'utils/jwt';

const Home = types
  .model('Home', {
    scheduledCards: types.array(types.frozen()),
    teamCards: types.array(types.frozen()),
    todoCards: types.array(types.frozen()),
    user: types.frozen(),
  })
  .actions(self => ({
    getCards: flow(function*() {
      try {
        const { userId } = getUserDetails();
        const { data } = yield UserService.getCardsByUser(userId);
        const { scheduledCards, teamCards, todoCards, user } = data;
        console.log(scheduledCards);
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
    addScheduledCard(contentCardData) {
      const { scheduledCards } = self;
      const data = [contentCardData, ...scheduledCards];
      self.scheduledCards = data;
    },
  }));

export const store = Home.create({
  scheduledCards: [],
  teamCards: [],
  todoCards: [],
  user: null,
});

export default Home;
