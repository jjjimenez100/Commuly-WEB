/* eslint-disable func-names */
import { types, flow } from 'mobx-state-tree';
import UserService from 'services/userService';
import { getUserDetails } from 'utils/jwt';
import { TODO_CONTENT, SCHEDULED_CONTENT } from '../constants/card';
import { DONE_STATUS, STUCK_STATUS } from '../constants/user';

const Home = types
  .model('Home', {
    scheduledCards: types.array(types.frozen()),
    filteredScheduledCards: types.array(types.frozen()),

    teamCards: types.array(types.frozen()),
    filteredTeamCards: types.array(types.frozen()),

    todoCards: types.array(types.frozen()),
    filteredTodoCards: types.array(types.frozen()),

    user: types.frozen(),
    currentCreateModalType: types.frozen(),
    currentCardData: types.frozen(),
    searchQuery: types.frozen(),
  })
  .actions(self => ({
    getCards: flow(function*() {
      try {
        const { userId } = getUserDetails();
        const { data } = yield UserService.getCardsByUser(userId);
        const { scheduledCards, teamCards, todoCards, user } = data;
        console.log(teamCards);
        self.scheduledCards = scheduledCards;
        self.filteredScheduledCards = scheduledCards;

        self.teamCards = teamCards;
        self.filteredTeamCards = teamCards;

        self.todoCards = todoCards;
        self.filteredTodoCards = todoCards;

        self.user = user;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        // handle error here
      }
    }),
    addCard(cardData) {
      const { scheduledCards, teamCards, todoCards, currentCreateModalType: cardType } = self;

      if (cardType === SCHEDULED_CONTENT) {
        const data = [cardData, ...scheduledCards];
        self.scheduledCards = data;
      } else if (cardType === TODO_CONTENT) {
        const data = [cardData, ...todoCards];
        self.todoCards = data;
      }

      const announcements = [cardData, ...teamCards];
      self.teamCards = announcements;
      // refresh filtered indexes
      self.searchCards();
    },
    updateCard(cardData) {
      const { scheduledCards, teamCards, todoCards, currentCreateModalType: cardType } = self;
      const { _id: updatedCardId } = cardData;

      if (cardType === SCHEDULED_CONTENT) {
        self.scheduledCards = self.insertCardAtIndex(scheduledCards, updatedCardId, cardData);
      } else if (cardType === TODO_CONTENT) {
        self.todoCards = self.insertCardAtIndex(todoCards, updatedCardId, cardData);
      }
      self.teamCards = self.insertCardAtIndex(teamCards, updatedCardId, cardData);
      // refresh filtered indexes
      self.searchCards();
    },
    insertCardAtIndex(cardArray, cardId, cardData) {
      const newCardArray = [...cardArray];
      const updatedCardIndex = newCardArray.findIndex(({ _id }) => cardId === _id);
      newCardArray.splice(updatedCardIndex, 1, cardData);

      return newCardArray;
    },
    setCurrentCreateModalType(modalType) {
      self.currentCreateModalType = modalType;
    },
    setCurrentCardData(cardData) {
      self.currentCardData = cardData;
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
    setFilteredCards(filteredTeamCards, filteredTodoCards, filteredScheduledCards) {
      self.filteredTeamCards = filteredTeamCards;
      self.filteredTodoCards = filteredTodoCards;
      self.filteredScheduledCards = filteredScheduledCards;
    },
    findMatchingObjectProperty(object, query) {
      return (
        object !== null &&
        (typeof object === 'object'
          ? Object.keys(object).some(key => this.findMatchingObjectProperty(object[key], query))
          : String(object)
              .toLowerCase()
              .startsWith(query))
      );
    },
    filterMatchingObjectProperties(array, query) {
      return array.filter(element => this.findMatchingObjectProperty(element, query));
    },
    searchCards() {
      const query = self.searchQuery;
      if (query === '') {
        self.filteredTeamCards = [...self.teamCards];
        self.filteredTodoCards = [...self.todoCards];
        self.filteredScheduledCards = [...self.scheduledCards];
        return;
      }

      const lowercaseQuery = query.toLowerCase();
      self.filteredTeamCards = this.filterMatchingObjectProperties(self.teamCards, lowercaseQuery);
      self.filteredTodoCards = this.filterMatchingObjectProperties(self.todoCards, lowercaseQuery);
      self.filteredScheduledCards = this.filterMatchingObjectProperties(
        self.scheduledCards,
        lowercaseQuery
      );
    },
    setSearchQuery(query) {
      self.searchQuery = query;
    },
  }));

export const store = Home.create({
  scheduledCards: [],
  teamCards: [],
  todoCards: [],
  user: null,
  currentCreateModalType: '',
  currentCardData: {},
  searchQuery: '',
});

export default Home;
