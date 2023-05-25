import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SummonersService } from '../summoners/summoners.service';
import { firstValueFrom } from 'rxjs';
import { RegionMapper } from './utils/region.mapper';

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

      if (status === 400) throw new BadRequestException(`${message}`);
      if (status === 401) throw new UnauthorizedException(`${message}`);
      if (status === 404) throw new NotFoundException(`${message}`);
      throw new InternalServerErrorException(JSON.stringify(e));
    }
  }

  async getMatchesIdsByPuuid(puuid: string, region: string): Promise<string[]> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(
          `https://${region}.${this.configService.get<string>(
            'RIOT_URL',
          )}/lol/match/v5/matches/by-puuid/${puuid}/ids`,
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
      } = e;

      if (status === 400) throw new BadRequestException();
      if (status === 401) throw new UnauthorizedException();
      if (status === 404) throw new NotFoundException();
      throw new InternalServerErrorException(JSON.stringify(e));
    }
  }

  async getMatchesDetails(region: string, summonerName: string) {
    try {
      if (!region || !summonerName)
        throw new BadRequestException('Missing Params');

      const { puuid } = await this.summonersService.getSummonerId(
        region,
        summonerName,
      );
      const summonerRegion = RegionMapper(region);
      const matches = await this.getMatchesIdsByPuuid(puuid, summonerRegion);
      const promises = matches.map(
        (match) => this.getMatchDetailById(match, summonerRegion),
        [],
      );
      const matchesDetails = (await Promise.allSettled(promises)).map(
        (data: any) => data.value,
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

      if (status === 400) throw new BadRequestException(`${message}`);
      if (status === 401) throw new UnauthorizedException(`${message}`);
      if (status === 404) throw new NotFoundException(`${message}`);
      throw new InternalServerErrorException(JSON.stringify(e));
    }
  }
}
