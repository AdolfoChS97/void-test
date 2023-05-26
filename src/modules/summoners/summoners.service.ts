import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { SummonerDto } from './dtos/summoners.dto';
import { handleErrorResponse } from 'src/utils/handle-error.helper';

@Injectable()
export class SummonersService {
  private riotToken = '';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.riotToken = this.configService.get<string>('RIOT_API_KEY');
  }

  async getSummonerId(
    platformId: string,
    summonerName: string,
  ): Promise<SummonerDto> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(
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

      return data;
    } catch (e) {
      handleErrorResponse(e);
    }
  }
}
