import httpService from './httpService';

const UserService = {
  getCardsByUser(userId, additionalConfig = {}) {
    return httpService.get(`user/${userId}/cards`, additionalConfig);
  },
};

export default UserService;
