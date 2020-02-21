import httpService from './httpService';

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
  markTodo(userId, todoInformation, additionalConfig = {}) {
    return httpService.patch(`user/${userId}/cards`, todoInformation, additionalConfig);
  },
};

export default UserService;
