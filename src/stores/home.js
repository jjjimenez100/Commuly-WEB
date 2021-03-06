/* eslint-disable func-names */
import findLastIndex from 'lodash/findLastIndex';
import { types, flow } from 'mobx-state-tree';
import { toast } from 'react-toastify';
import UserService from 'services/userService';
import { getUserDetails } from 'utils/jwt';
import { filterMatchingObjectProperties } from 'utils/search';
import { TODO_CONTENT, SCHEDULED_CONTENT } from '../constants/card';
import {
  DONE_STATUS,
  STUCK_STATUS,
  EMPLOYEE_ROLE,
  SUPERVISOR_ROLE,
  PROGRAM_ADMINISTRATOR_ROLE,
} from '../constants/user';

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
    eventCards: types.frozen(),

    pinnedCards: types.frozen(),
    filteredPinnedCards: types.frozen(),
  })
  .actions(self => ({
    getCards: flow(function*() {
      try {
        const { userId } = getUserDetails();
        const { data } = yield UserService.getCardsByUser(userId);
        const { scheduledCards, teamCards, todoCards, user } = data;
        const {
          employeePinnedCard = {},
          programAdministratorPinnedCard = {},
          supervisorPinnedCard = {},
        } = user;

        self.scheduledCards = scheduledCards;
        self.filteredScheduledCards = scheduledCards;

        self.teamCards = teamCards;
        self.filteredTeamCards = teamCards;

        self.todoCards = todoCards;
        self.filteredTodoCards = todoCards;

        self.user = user;

        const pinnedCards = {
          [PROGRAM_ADMINISTRATOR_ROLE]: programAdministratorPinnedCard,
          [SUPERVISOR_ROLE]: supervisorPinnedCard,
          [EMPLOYEE_ROLE]: employeePinnedCard,
        };
        self.pinnedCards = pinnedCards;
        self.filteredPinnedCards = pinnedCards;

        const eventCards = [...todoCards, ...scheduledCards].reduce((accumulator, currentValue) => {
          let startDate = '';
          const { _id, cardType, contentCardType, owner } = currentValue;
          const newValue = { _id, cardType, contentCardType, owner };

          if (contentCardType === TODO_CONTENT) {
            startDate = currentValue.todoContent.startDate;
            newValue.startDate = currentValue.todoContent.startDate;
            newValue.endDate = currentValue.todoContent.endDate;
            newValue.startTime = currentValue.todoContent.startTime;
            newValue.endTime = currentValue.todoContent.endTime;
            newValue.title = currentValue.todoContent.title;
          } else if (contentCardType === SCHEDULED_CONTENT) {
            startDate = currentValue.scheduledEventContent.startDate;
            newValue.startDate = currentValue.scheduledEventContent.startDate;
            newValue.endDate = currentValue.scheduledEventContent.endDate;
            newValue.startTime = currentValue.scheduledEventContent.startTime;
            newValue.endTime = currentValue.scheduledEventContent.endTime;
            newValue.title = currentValue.scheduledEventContent.title;
          }

          if (!accumulator[startDate]) {
            accumulator[startDate] = [newValue];
          } else {
            accumulator[startDate] = [...accumulator[startDate], newValue];
          }

          return accumulator;
        }, {});

        self.eventCards = eventCards;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        // handle error here
      }
    }),
    setPinnedCard(pinnedCardData, pinType) {
      const newPinnedCards = { ...self.pinnedCards };
      newPinnedCards[pinType] = pinnedCardData;

      self.pinnedCards = newPinnedCards;
    },
    pinCard(pinnedCardData, pinType) {
      self.setPinnedCard(pinnedCardData, pinType);
      // remove on team cards
      const { _id: id } = pinnedCardData;
      self.teamCards = self.teamCards.filter(({ _id }) => _id !== id);
      self.searchCards();
    },
    unpinCard(pinnedCardData, pinType) {
      self.setPinnedCard({}, pinType);
      // insert back to team cards
      self.teamCards = [...self.teamCards, pinnedCardData];
      self.searchCards();
    },
    addCard(cardData) {
      const { scheduledCards, teamCards, todoCards, currentCreateModalType: cardType } = self;
      cardData.isPinned = false;
      if (cardType === SCHEDULED_CONTENT || cardType === TODO_CONTENT) {
        if (cardType === SCHEDULED_CONTENT) {
          const data = [cardData, ...scheduledCards];
          self.scheduledCards = data;
        } else if (cardType === TODO_CONTENT) {
          const data = [cardData, ...todoCards];
          self.todoCards = data;
        }

        const eventCards = { ...self.eventCards };
        if (!eventCards[cardData.startDate]) {
          eventCards[cardData.startDate] = [cardData];
        } else {
          eventCards[cardData.startDate] = [...eventCards[cardData.startDate], cardData];
        }

        self.eventCards = eventCards;
      }

      self.teamCards = self.insertCardAfterLastPinnedCard(teamCards, cardData);
      self.searchCards();
    },
    updateCard(cardData) {
      const { scheduledCards, teamCards, todoCards, currentCreateModalType: cardType } = self;
      const { _id: updatedCardId } = cardData;

      if (cardType === SCHEDULED_CONTENT) {
        self.scheduledCards = self.updateCardAtIndex(scheduledCards, updatedCardId, cardData);
      } else if (cardType === TODO_CONTENT) {
        self.todoCards = self.updateCardAtIndex(todoCards, updatedCardId, cardData);
      }
      self.teamCards = self.updateCardAtIndex(teamCards, updatedCardId, cardData);
      self.searchCards();
    },
    removeQuestionCard(questionCardId) {
      const questionCardIndex = self.teamCards.findIndex(({ _id: id }) => id === questionCardId);
      const newTeamCards = [...self.teamCards];
      newTeamCards.splice(questionCardIndex, 1);
      self.teamCards = newTeamCards;
      self.searchCards();
    },
    removeCardAndInsertAtEnd(cardArray, cardId, cardData) {
      const newCardArray = [...cardArray];
      const foundIndex = newCardArray.findIndex(({ _id }) => cardId === _id);
      const deletedExistingCard = newCardArray.splice(foundIndex - 1, 1);
      return [...deletedExistingCard, cardData];
    },
    insertCardAtStartAndRemoveExistingCard(cardArray, cardId, cardData) {
      const newCardArray = [...cardArray];
      const foundIndex = newCardArray.findIndex(({ _id }) => cardId === _id);
      if (foundIndex === -1) {
        newCardArray.splice(0, 0, cardData);
        return newCardArray;
      }
      const deletedExistingCard = newCardArray.splice(foundIndex - 1, 1);
      return [cardData, ...deletedExistingCard];
    },
    insertCardAfterLastPinnedCard(cardArray, cardData) {
      const newCardArray = [...cardArray];
      const foundIndex = findLastIndex(cardArray, { isPinned: true });
      if (foundIndex === -1) {
        newCardArray.splice(0, 0, cardData);
      } else {
        newCardArray.splice(foundIndex + 1, 0, cardData);
      }

      return newCardArray;
    },
    updateCardAtIndex(cardArray, cardId, cardData) {
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
        const patchMessage = patchType.toLowerCase();
        const body = { cardId, patchType };
        yield UserService.markTodo(userId, body);
        self.todoCards = [...self.todoCards].filter(({ _id }) => _id !== cardId);
        self.teamCards = [...self.teamCards].filter(({ _id }) => _id !== cardId);
        self.searchCards();
        toast.success(`Successfully marked todo as ${patchMessage}!`);
      } catch (error) {
        toast.error('Failed to mark todo. Please try again later.');
        // eslint-disable-next-line no-console
        console.log(error);
        // handle error here
      }
    }),
    searchCards() {
      const query = self.searchQuery;
      if (query === '') {
        self.filteredTeamCards = [...self.teamCards];
        self.filteredTodoCards = [...self.todoCards];
        self.filteredScheduledCards = [...self.scheduledCards];
        return;
      }

      const lowercaseQuery = query.toLowerCase();
      self.filteredTeamCards = filterMatchingObjectProperties(self.teamCards, lowercaseQuery);
      self.filteredTodoCards = filterMatchingObjectProperties(self.todoCards, lowercaseQuery);
      self.filteredScheduledCards = filterMatchingObjectProperties(
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
  eventCards: {},

  pinnedCards: {},
  filteredPinnedCards: [],
});

export default Home;
