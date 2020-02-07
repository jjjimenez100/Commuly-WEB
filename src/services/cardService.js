import httpService from './httpService';

const CardService = {
  createNewContentCard(requestBody, additionalConfig = {}) {
    return httpService.post('/card', requestBody, additionalConfig);
  },
  getCardsByTeam(team, page, limit, additionalConfig = {}) {
    const config = {
      params: {
        team,
        page,
        limit,
      },
      ...additionalConfig,
    };
    return httpService.get('/cards', config);
  },
};

export default CardService;
