import { Controller, Get, Param } from '@nestjs/common';
import { SummonersService } from './summoners.service';
import {
  ApiExcludeController,
  ApiNotFoundResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SummonerDto } from './dtos/summoners.dto';

@ApiTags('Summoners')
@Controller('summoners')
@ApiExcludeController()
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
    name: 'platformId',
    description: 'It will be the platform that you belong',
  })
  @ApiParam({
    example: 'summoner name',
    name: 'summonerName',
  })
  @Get(':platformId/:summonerName')
  async getSummonerId(
    @Param('platformId') platformId: string,
    @Param('summonerName') summonerName: string,
  ) {
    try {
      return await this.summonersService.getSummonerId(
        platformId,
        summonerName,
      );
    } catch (e) {
      throw e;
    }
  }
}
