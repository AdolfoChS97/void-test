import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class QueryParamsRiotDto {
  @ApiProperty({
    type: 'number',
    required: false,
    description:
      'Defaults to 20. Valid values: 0 to 100. Number of match ids to return.',
    default: 20,
  })
  @IsOptional()
  @IsInt()
  @IsPositive()
  count?: number;

  @ApiProperty({
    type: 'number',
    required: false,
    description: 'Defaults to 0. Start index.',
    default: 0,
  })
  @IsOptional()
  @IsInt()
  @IsPositive()
  start?: number;
}
