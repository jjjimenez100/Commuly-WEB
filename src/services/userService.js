import httpService from './httpService';

const UserService = {
  getCardsByUser(userId, additionalConfig = {}) {
    return httpService.get(`user/${userId}/cards`, additionalConfig);
  },
  registerNewUser(userInformation, additionalConfig = {}) {
    return httpService.post('users', userInformation, additionalConfig);
  },
};

export default UserService;
