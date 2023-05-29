import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Summoners' })
export class SummonersEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    type: 'string',
    description: 'Encrypted summoner ID. Max length 63 characters.',
  })
  id: string;

  @Column()
  @ApiProperty({
    type: 'string',
    description: 'string	Encrypted account ID. Max length 56 characters.',
  })
  accountId: string;

  @Column()
  @ApiProperty({
    type: 'number',
    description: 'ID of the summoner icon associated with the summoner.',
  })
  profileIconId: number;

  @Column()
  @ApiProperty({ type: 'string', description: 'Summoner name.' })
  name: string;

  @Column()
  @ApiProperty({
    type: 'string',
    description: 'Encrypted PUUID. Exact length of 78 characters.',
  })
  puuid: string;

  @Column({ type: 'int' })
  @ApiProperty({
    type: 'number',
    description:
      'summoner was last modified specified as epoch milliseconds. The following events will update this timestamp: summoner name change, summoner level change, or profile icon change.',
  })
  revisionDate: number;

  @Column({ type: 'int' })
  @ApiProperty({
    type: 'number',
    description: 'Summoner level associated with the summoner.',
  })
  summonerLevel: number;
}
