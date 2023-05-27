import { GetMatchesDto } from '../dtos/matches.dto';

interface PlayerInfo {
  championUsed: string;
  win: boolean;
  kda: number;
  kills: number;
  csPerMinute: number;
  runes: Record<string, number>;
  assists: number;
  spells: number[];
}

export const MatchesMapper = (data): GetMatchesDto | any => {
  const {
    metadata: { matchId },
    info: {
      gameCreation,
      gameDuration,
      gameEndTimestamp,
      gameId,
      queueId,
      participants,
    },
  } = data;

  const players = participants.map((participant) => {
    const info: PlayerInfo = {
      championUsed: participant.championName,
      win: participant.win,
      kda:
        participant.kills +
        participant.assists / Math.max(participant.deaths, 1),
      kills: participant.kills,
      csPerMinute:
        participant.laneMinionsFirst10Minutes / (participant.gameLength / 60),
      runes: participant.perks.styles.reduce(
        (result: Record<string, number>, style) => {
          style.selections.forEach((selection) => {
            result[selection.perk.toString()] = selection.var1;
          });
          return result;
        },
        {},
      ),
      assists: participant.assists,
      spells: [participant.spell1Id, participant.spell2Id],
    };

    return info;
  });

  return {
    matchId,
    gameCreation,
    gameDuration,
    gameEndTimestamp,
    gameId,
    queueId,
    players,
  };
};
