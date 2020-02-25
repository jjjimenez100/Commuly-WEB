import { CONTENT_CARD, TEXT_CONTENT } from 'constants/card';
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
  createNewTextContentCard(textCardBody, additionalConfig = {}) {
    const body = {
      contentCardType: TEXT_CONTENT,
      cardType: CONTENT_CARD,
      ...textCardBody,
    };

    return httpService.post('/card', body, additionalConfig);
  },
  patchCard(cardId, requestBody, additionalConfig = {}) {
    return httpService.patch(`/card/${cardId}`, requestBody, additionalConfig);
  },
};

export default CardService;
