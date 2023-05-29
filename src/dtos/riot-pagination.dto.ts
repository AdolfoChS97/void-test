import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class QueryParamsRiotDto {
  @ApiProperty({
    type: 'number',
    required: false,
    description:
      'Defaults to 20. Valid values: 0 to 100. Number of match ids to return.',
    default: 20,
  })
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  count?: number;

  @ApiProperty({
    type: 'number',
    required: false,
    description: 'Defaults to 0. Start index.',
    default: 0,
  })
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  start?: number;
}
