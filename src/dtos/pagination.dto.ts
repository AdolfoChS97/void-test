import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    type: 'number',
    required: false,
    description:
      'Defaults to 20. Valid values: 0 to 100. Number of match ids to return.',
    default: 20,
  })
  @IsOptional()
  @IsPositive()
  @IsInt()
  size?: number;

  @ApiProperty({
    type: 'number',
    required: false,
    description: 'Defaults to 0. Start index.',
    default: 0,
  })
  @IsOptional()
  @IsInt()
  limit?: number;
}
