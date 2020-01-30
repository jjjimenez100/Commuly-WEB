import httpService from './httpService';

const CardService = {
  createNewContentCard(requestBody, additionalConfig = {}) {
    httpService.post('/card', requestBody, additionalConfig);
  },
};

export default CardService;
