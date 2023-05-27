import { ApiProperty } from '@nestjs/swagger';

export class LeagueSummaryDto {
  @ApiProperty({ type: 'string' })
  leagueId: string;

  @ApiProperty({ type: 'string' })
  queueType: string;

  @ApiProperty({ type: 'string' })
  tier: string;

  @ApiProperty({
    type: 'string',
    description: `The player's division within a tier.`,
  })
  rank: string;

  @ApiProperty({ type: 'number' })
  leaguePoints: number;

  @ApiProperty({
    type: 'number',
    description: 'Winning team on Summoners Rift.',
  })
  wins: number;

  @ApiProperty({
    type: 'number',
    description: 'Losing team on Summoners Rift.  ',
  })
  losses: number;
}
