import httpService from './httpService';
import { PIN_USER, UNPIN_USER } from '../constants/user';

const UserService = {
  getCardsByUser(userId, additionalConfig = {}) {
    return httpService.get(`user/${userId}/cards`, additionalConfig);
  },
  registerNewUser(userInformation, additionalConfig = {}) {
    return httpService.post('users', userInformation, additionalConfig);
  },
  loginUser(userCredentials, additionalConfig = {}) {
    return httpService.post('login', userCredentials, additionalConfig);
  },
  // TODO: Refactor http services to internally use patch type
  // instead of accepting them as parameters
  markTodo(userId, todoInformation, additionalConfig = {}) {
    return httpService.patch(`user/${userId}/cards`, todoInformation, additionalConfig);
  },
  pinCardToUserStream(userId, cardId, additionalConfig = {}) {
    const data = {
      userId,
      cardId,
      patchType: PIN_USER,
    };
    return httpService.patch(`user/${userId}/cards`, data, additionalConfig);
  },
  unpinCardToUserStream(userId, cardId, additionalConfig = {}) {
    const data = {
      userId,
      cardId,
      patchType: UNPIN_USER,
    };
    return httpService.patch(`user/${userId}/cards`, data, additionalConfig);
  },
};

export default UserService;
