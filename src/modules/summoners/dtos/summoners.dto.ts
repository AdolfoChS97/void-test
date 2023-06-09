import { OmitType } from '@nestjs/swagger';
import { SummonersEntity } from 'src/entities/summoners.entity';

export class SummonerDto extends OmitType(SummonersEntity, [
  'revisionDate',
] as const) {}
