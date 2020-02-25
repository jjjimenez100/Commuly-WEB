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
  updateContentCard(cardId, requestBody, additionalConfig = {}) {
    return httpService.put(`/card/${cardId}`, requestBody, additionalConfig);
  },
  // workaround
  updateContentCardWithFiles(cardId, requestBody, additionalConfig = {}) {
    return httpService.post(`/card/${cardId}`, requestBody, additionalConfig);
  },
  addQuestionResponse(cardId, requestBody, additionalConfig = {}) {
    return httpService.patch(`/card/${cardId}`, requestBody, additionalConfig);
  },
};

export default CardService;
