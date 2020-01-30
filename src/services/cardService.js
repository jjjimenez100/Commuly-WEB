import httpService from './httpService';

const CardService = {
  createNewContentCard(requestBody, additionalConfig = {}) {
    httpService.post('/card', requestBody, additionalConfig);
  },
  getCardsByTeam(team, additionalConfig = {}) {
    const config = {
      params: {
        team,
      },
      ...additionalConfig,
    };
    httpService.get('/cards', config);
  },
};

export default CardService;
