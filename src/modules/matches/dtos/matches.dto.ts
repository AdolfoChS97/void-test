import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';
import { PaginationDto } from 'src/dtos/pagination.dto';

export class PlayerInfoDto {
  @ApiProperty({
    type: 'string',
    description: 'The champion used by the player.',
  })
  championUsed: string;

  @ApiProperty({
    type: 'boolean',
    description: ' Indicates whether the player won the match.',
  })
  win: boolean;

  @ApiProperty({
    type: 'number',
    description: `The player's Kill-Death-Assist ratio.`,
  })
  kda: number;

  @ApiProperty({
    type: 'number',
    description: 'The number of kills achieved by the player.',
  })
  kills: number;

  @ApiProperty({
    type: 'number',
    description:
      'The average number of creep score (CS) per minute obtained by the player.',
  })
  csPerMinute: number;

  @ApiProperty({
    type: '',
    description:
      'A collection of runes used by the player, represented as key-value pairs where the key is the rune name and the value is the count or amount.',
  })
  runes: Record<string, number>;

  @ApiProperty({
    type: 'number',
    description: 'The number of assists achieved by the player.',
  })
  assists: number;

  @ApiProperty({
    type: 'number',
    description:
      ' An array of numbers representing the spells used by the player.',
    isArray: true,
  })
  spells: number[];
}

export class GetMatchesDto {
  @ApiProperty({ type: 'string', description: 'The ID of the match.' })
  matchId: string;

  @ApiProperty({
    type: 'number',
    description: 'The timestamp indicating when the game was created.',
  })
  gameCreation: number;

  @ApiProperty({
    type: 'number',
    description: 'The duration of the game in seconds.',
  })
  gameDuration: number;

  @ApiProperty({
    type: 'number',
    description: 'The timestamp indicating when the game ended.',
  })
  gameEndTimestamp: number;

  @ApiProperty({ type: 'number', description: 'The ID of the game.' })
  gameId: number;

  @ApiProperty({ type: 'number', description: 'The ID of the game queue.' })
  @IsInt()
  @IsPositive()
  queueId: number;

  @ApiProperty({
    type: PlayerInfoDto,
    description:
      'An array of PlayerInfoDto objects representing the players who participated in the match.',
    isArray: true,
  })
  players: PlayerInfoDto[];
}

export class MatchesQueryParamsDto extends IntersectionType(
  PickType(GetMatchesDto, ['queueId'] as const),
  PaginationDto,
) {}
