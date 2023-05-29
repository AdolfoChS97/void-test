import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SummonersService } from '../summoners/summoners.service';
import { firstValueFrom } from 'rxjs';
import { QueryParamsRiotDto } from 'src/dtos/riot-pagination.dto';
import { MatchesMapper } from './utils/matches.mapper';
import { handleErrorResponse } from 'src/utils/handle-error.helper';
import { MatchesQueryParamsDto } from './dtos/matches.dto';
import { RegionMapper } from 'src/utils/region.mapper';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class MatchesService {
  private riotToken = '';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly summonersService: SummonersService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {
    this.riotToken = this.configService.get<string>('RIOT_API_KEY');
  }

  async getMatchDetailById(matchId: string, region: string) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(
          `https://${region}.${this.configService.get<string>(
            'RIOT_URL',
          )}/lol/match/v5/matches/${matchId}`,
          {
            headers: {
              'X-Riot-Token': this.riotToken,
            },
          },
        ),
      );
      await this.cacheService.set(matchId, data);
      return this.cacheService.get(matchId);
    } catch (e) {
      handleErrorResponse(e);
    }
  }

  async getMatchesIdsByPuuid(
    puuid: string,
    platformId: string,
    params: QueryParamsRiotDto,
  ): Promise<string[]> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(
          `https://${platformId}.${this.configService.get<string>(
            'RIOT_URL',
          )}/lol/match/v5/matches/by-puuid/${puuid}/ids`,
          {
            params: {
              ...params,
            },
            headers: {
              'X-Riot-Token': this.riotToken,
            },
          },
        ),
      );
      await this.cacheService.set(puuid, data);
      return this.cacheService.get(puuid);
    } catch (e) {
      handleErrorResponse(e);
    }
  }

  async getMatchesDetails(
    platformId: string,
    summonerName: string,
    queryParams?: MatchesQueryParamsDto,
  ) {
    try {
      const filters = {
        queueId: queryParams.queueId,
      };

      const params: QueryParamsRiotDto = {
        count: queryParams.size,
        start: queryParams.limit,
      };
      const region = RegionMapper(platformId);

      const { puuid } = await this.summonersService.getSummonerId(
        platformId,
        summonerName,
      );
      const matches = await this.getMatchesIdsByPuuid(puuid, region, params);

      const promises = matches.map(
        (match) => this.getMatchDetailById(match, region),
        [],
      );

      const matchesDetails = (await Promise.allSettled(promises))
        .map((data: any) => MatchesMapper(data.value), [])
        .filter((match) => match.queueId === filters.queueId);

      return matchesDetails;
    } catch (e) {
      handleErrorResponse(e);
    }
  }
}
