import { Controller, Get, Param, Query, ValidationPipe } from '@nestjs/common';
import { MatchesService } from './matches.service';
import {
  ApiNotFoundResponse,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GetMatchesDto, MatchesQueryParamsDto } from './dtos/matches.dto';

@ApiTags('Matches')
@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @ApiResponse({
    type: GetMatchesDto,
    isArray: true,
    status: 200,
    description: 'Will return a matches data if exists',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: `Won't return any match data, only the status 404 and a message`,
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: `Won't return any match data, only the status 401 and a message`,
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
  @ApiQuery({ name: 'size', type: 'number', example: 20 })
  @ApiQuery({ name: 'limit', type: 'number', example: 0 })
  @ApiQuery({ name: 'queueId', type: 'number', example: 440 })
  @Get(':platformId/:summonerName')
  async getMatchesDetails(
    @Param('platformId') platformId: string,
    @Param('summonerName') summonerName: string,
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    queryParams: MatchesQueryParamsDto,
  ) {
    try {
      return await this.matchesService.getMatchesDetails(
        platformId,
        summonerName,
        queryParams,
      );
    } catch (e) {
      throw e;
    }
  }
}
