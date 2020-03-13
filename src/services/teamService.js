import httpService from './httpService';
import { PIN_CARD_TEAM, UNPIN_CARD_TEAM } from '../constants/team';

const TeamService = {
  pinCardToTeamStream(teamId, cardId, pinType, additionalConfig = {}) {
    const data = {
      teamId,
      cardId,
      pinType,
      patchType: PIN_CARD_TEAM,
    };
    return httpService.patch(`team/${teamId}`, data, additionalConfig);
  },
  unpinCardToTeamStream(teamId, cardId, additionalConfig = {}) {
    const data = {
      teamId,
      cardId,
      patchType: UNPIN_CARD_TEAM,
    };
    return httpService.patch(`team/${teamId}`, data, additionalConfig);
  },
};

export default TeamService;
