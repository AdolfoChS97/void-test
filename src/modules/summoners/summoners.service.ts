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
    region: string,
    summonerName: string,
  ): Promise<SummonerDto> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(
          `https://${region}.${this.configService.get<string>(
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
