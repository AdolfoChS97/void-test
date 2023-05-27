import { Controller, Get, Param } from '@nestjs/common';
import { PlayersService } from './players.service';
import {
  ApiNotFoundResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import PlayerSummaryDto from './dtos/player.dto';

@ApiTags('Players')
@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @ApiResponse({
    type: PlayerSummaryDto,
    isArray: true,
    status: 200,
    description: 'Will return a summary of the summoner if exists',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: `Won't return any summary data, only the status 404 and a message`,
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: `Won't return any summary data, only the status 401 and a message`,
  })
  @ApiParam({
    example: 'LA1',
    name: 'platformId',
    description: 'It will be the platform that you belong',
  })
  @ApiParam({
    example: 'summoner name',
    name: 'summonerName',
    description: `It's the nickname of the user`,
  })
  @ApiParam({
    example: 'LA1',
    name: 'platformId',
    description: 'It will be the platform that you belong',
  })
  @ApiParam({
    example: 'summoner name',
    name: 'summonerName',
    description: `It's the nickname of the user`,
  })
  @Get(':platformId/:summonerName')
  getPlayerSummary(
    @Param('platformId') platformId: string,
    @Param('summonerName') summonerName: string,
  ) {
    try {
      return this.playersService.getPlayerSummary(platformId, summonerName);
    } catch (e) {
      throw e;
    }
  }
}
