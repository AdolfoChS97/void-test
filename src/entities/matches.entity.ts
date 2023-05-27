import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm';

@Entity({ name: 'Matches' })
export default class MatchesEntity {
  @PrimaryGeneratedColumn()
  matchId: string;

  @Column({ type: 'number' })
  queueId: number;
}
