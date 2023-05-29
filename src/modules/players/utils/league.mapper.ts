import { LeagueSummaryDto } from '../dtos/league.dto';

export const LeagueMapper = (summary: LeagueSummaryDto) => {
  const { leagueId, queueType, tier, rank, leaguePoints, wins, losses } =
    summary;

  return { leagueId, queueType, tier, rank, leaguePoints, wins, losses };
};
