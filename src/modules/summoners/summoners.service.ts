import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { SummonerDto } from './dtos/summoners.dto';
import { handleErrorResponse } from 'src/utils/handle-error.helper';
import { Cache } from 'cache-manager';

@Injectable()
export class SummonersService {
  private riotToken = '';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {
    this.riotToken = this.configService.get<string>('RIOT_API_KEY');
  }

  async getSummonerId(
    platformId: string,
    summonerName: string,
  ): Promise<SummonerDto> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<SummonerDto>(
          `https://${platformId}.${this.configService.get<string>(
            'RIOT_URL',
          )}/lol/summoner/v4/summoners/by-name/${summonerName}`,
          {
            headers: {
              'X-Riot-Token': this.riotToken,
            },
          },
        ),
      );
      await this.cacheService.set(data.id.toString(), data);
      return await this.cacheService.get(data.id);
    } catch (e) {
      handleErrorResponse(e);
    }
  }
}
