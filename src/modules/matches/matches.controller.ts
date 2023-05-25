import { Controller, Get, Param } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Matches')
@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @ApiQuery({ name: 'size', type: 'number', example: 0 })
  @ApiQuery({ name: 'limit', type: 'number', example: 0 })
  @Get(':region/:summonerName')
  async getMatchesDetails(
    @Param('region') region: string,
    @Param('summonerName') summonerName: string,
  ) {
    try {
      return await this.matchesService.getMatchesDetails(region, summonerName);
    } catch (e) {
      throw e;
    }
  }
}
