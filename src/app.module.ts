import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SummonersModule } from './modules/summoners/summoners.module';
import { MatchesModule } from './modules/matches/matches.module';
import { CacheModule } from '@nestjs/cache-manager';
import { PlayersModule } from './modules/players/players.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SummonersEntity } from './entities/summoners.entity';

const configService = new ConfigService();

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: configService.get<string>('DB_HOST'),
    //   port: configService.get<number>('DB_PORT'),
    //   username: configService.get<string>('DB_USER'),
    //   password: configService.get<string>('DB_PASS'),
    //   database: configService.get<string>('DB_NAME'),
    //   entities: [SummonersEntity],
    //   synchronize: true,
    //   logging: false,
    // }),
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    CacheModule.register({
      isGlobal: true,
      ttl: 60,
    }),
    SummonersModule,
    MatchesModule,
    PlayersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
