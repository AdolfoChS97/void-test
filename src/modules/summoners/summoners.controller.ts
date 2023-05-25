import { Controller, Get, Param } from '@nestjs/common';
import { SummonersService } from './summoners.service';
import {
  ApiNotFoundResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SummonerDto } from './dtos/summoners.dto';

@ApiTags('Summoners')
@Controller('summoners')
export class SummonersController {
  constructor(private readonly summonersService: SummonersService) {}

  @ApiResponse({
    type: SummonerDto,
    status: 200,
    description: 'Will return a summoner if exists',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: `Won't return any summoner data, only the status 404 and a message`,
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: `Won't return any summoner data, only the status 404 and a message`,
  })
  @ApiParam({
    example: 'LA1',
    name: 'region',
    description: 'It will be the region that you belong',
  })
  @ApiParam({
    example: 'summoner name',
    name: 'summonerName',
  })
  @Get(':region/:summonerName')
  async getSummonerId(
    @Param('region') region: string,
    @Param('summonerName') summonerName: string,
  ) {
    try {
      return await this.summonersService.getSummonerId(region, summonerName);
    } catch (e) {
      throw e;
    }
  }
}
