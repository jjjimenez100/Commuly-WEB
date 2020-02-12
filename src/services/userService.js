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
};

export default UserService;
