import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { handleErrorResponse } from 'src/utils/handle-error.helper';
import { SummonersService } from '../summoners/summoners.service';
import { firstValueFrom } from 'rxjs';
import { LeagueSummaryDto } from './dtos/league.dto';
import { LeagueMapper } from './utils/league.mapper';
import PlayerSummaryDto from './dtos/player.dto';
import { PlayerSummaryMapper } from './utils/player-summary.mapper';
import { Cache } from 'cache-manager';
import { QueryParamsDto } from '../matches/dtos/matches.dto';
import { getQueueType } from 'src/utils/getQueueType.helper';

@Injectable()
export class PlayersService {
  private riotToken = '';

  constructor(
    private httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly summonersService: SummonersService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {
    this.riotToken = this.configService.get<string>('RIOT_API_KEY');
  }

  async getPlayerSummary(
    platformId: string,
    summonerName: string,
    params: QueryParamsDto,
  ): Promise<PlayerSummaryDto> {
    try {
      const { queueId } = params;
      const { id, name, summonerLevel, profileIconId } =
        await this.summonersService.getSummonerId(platformId, summonerName);

      const summaryLeague = await this.getLeagueSummaryBySummonerId(
        id,
        platformId,
        queueId,
      );

      return PlayerSummaryMapper(
        id,
        name,
        profileIconId,
        summonerLevel,
        summaryLeague,
      );
    } catch (e) {
      handleErrorResponse(e);
    }
  }

  async getLeagueSummaryBySummonerId(
    summonerId,
    platformId,
    queueId,
  ): Promise<LeagueSummaryDto[]> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(
          `https://${platformId}.${this.configService.get<string>(
            'RIOT_URL',
          )}/lol/league/v4/entries/by-summoner/${summonerId}`,
          {
            params: {},
            headers: {
              'X-Riot-Token': this.riotToken,
            },
          },
        ),
      );
      await this.cacheService.set(summonerId, data);
      const cachedLeagueSummary = await this.cacheService.get<
        LeagueSummaryDto[]
      >(summonerId);
      return cachedLeagueSummary
        .map((summary: LeagueSummaryDto) => LeagueMapper(summary), [])
        .filter(
          (leagueSummary) => leagueSummary.queueType == getQueueType(queueId),
        );
    } catch (e) {
      handleErrorResponse(e);
    }
  }
}
