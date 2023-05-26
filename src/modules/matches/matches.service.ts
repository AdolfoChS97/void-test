import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SummonersService } from '../summoners/summoners.service';
import { firstValueFrom } from 'rxjs';
import { RegionMapper } from './utils/region.mapper';
import { PaginationDto } from 'src/dtos/pagination.dto';
import { QueryParamsRiotDto } from 'src/dtos/riot-pagination.dto';
import { MatchesMapper } from './utils/matches.mapper';
import { handleErrorResponse } from 'src/utils/handle-error.helper';

@Injectable()
export class MatchesService {
  private riotToken = '';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly summonersService: SummonersService,
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
      return data;
    } catch (e) {
      const {
        response: { status },
        data: {
          status: { message },
        },
      } = e;

      handleErrorResponse(status, message, e);
    }
  }

  async getMatchesIdsByPuuid(
    puuid: string,
    platformId: string,
    params: QueryParamsRiotDto = { count: 20, start: 0 },
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
      return data;
    } catch (e) {
      const {
        response: { status },
        data: {
          status: { message },
        },
      } = e;

      handleErrorResponse(status, message, e);
    }
  }

  async getMatchesDetails(
    platformId: string,
    summonerName: string,
    queryParams?: PaginationDto,
  ) {
    try {
      if (!platformId || !summonerName)
        throw new BadRequestException('Missing Params');

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
      const matchesDetails = (await Promise.allSettled(promises)).map(
        (data: any) => MatchesMapper(data.value),
        [],
      );
      return matchesDetails;
    } catch (e) {
      const {
        response: { status },
        data: {
          status: { message },
        },
      } = e;

      handleErrorResponse(status, message, e);
    }
  }
}