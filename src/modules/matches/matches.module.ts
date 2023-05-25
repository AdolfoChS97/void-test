import { Module } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { HttpModule } from '@nestjs/axios';
import { SummonersModule } from '../summoners/summoners.module';

@Module({
  imports: [HttpModule, SummonersModule],
  controllers: [MatchesController],
  providers: [MatchesService],
})
export class MatchesModule {}
