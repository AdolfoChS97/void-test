import PlayerSummaryDto from '../dtos/player.dto';

export const PlayerSummaryMapper = (
  id,
  name,
  profileIconId,
  summonerLevel,
  leagueSummary,
): PlayerSummaryDto => {
  return {
    id: id,
    name: name,
    profileIconId: profileIconId,
    summonerLevel: summonerLevel,
    summary: leagueSummary,
  };
};
