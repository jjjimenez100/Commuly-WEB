import httpService from './httpService';
import { CONTENT_CARD, TEXT_CONTENT } from '../constants/card';

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
};

export default CardService;
