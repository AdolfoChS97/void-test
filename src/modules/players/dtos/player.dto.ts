import { ApiProperty, PickType } from '@nestjs/swagger';
import { SummonerDto } from 'src/modules/summoners/dtos/summoners.dto';
import { LeagueSummaryDto } from './league.dto';

export default class PlayerSummaryDto extends PickType(SummonerDto, [
  'id',
  'name',
  'profileIconId',
  'summonerLevel',
]) {
  @ApiProperty({ type: LeagueSummaryDto, isArray: true })
  summary: LeagueSummaryDto[];
}
