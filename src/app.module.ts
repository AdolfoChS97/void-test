import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SummonersModule } from './modules/summoners/summoners.module';
import { MatchesModule } from './modules/matches/matches.module';
import { CacheModule } from '@nestjs/cache-manager';
import { PlayersModule } from './modules/players/players.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    CacheModule.register({ isGlobal: true }),
    SummonersModule,
    MatchesModule,
    PlayersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
