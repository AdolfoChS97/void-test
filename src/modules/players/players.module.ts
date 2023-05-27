import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { HttpModule } from '@nestjs/axios';
import { SummonersModule } from '../summoners/summoners.module';

@Module({
  imports: [HttpModule, SummonersModule],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayersModule {}
