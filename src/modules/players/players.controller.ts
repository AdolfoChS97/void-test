import { Controller, Get, Param, Query, ValidationPipe } from '@nestjs/common';
import { PlayersService } from './players.service';
import {
  ApiNotFoundResponse,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import PlayerSummaryDto from './dtos/player.dto';
import { QueryParamsDto } from '../matches/dtos/matches.dto';

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
  @ApiQuery({ name: 'queueId', type: 'number', example: 440, required: true })
  @Get(':platformId/:summonerName')
  getPlayerSummary(
    @Param('platformId') platformId: string,
    @Param('summonerName') summonerName: string,
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    params: QueryParamsDto,
  ) {
    try {
      return this.playersService.getPlayerSummary(
        platformId,
        summonerName,
        params,
      );
    } catch (e) {
      throw e;
    }
  }
}
