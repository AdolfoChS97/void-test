import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SummonersModule } from './modules/summoners/summoners.module';
import { MatchesModule } from './modules/matches/matches.module';
import { CacheModule } from '@nestjs/cache-manager';
import { PlayersModule } from './modules/players/players.module';

import * as Joi from 'joi';

import { TypeOrmModule } from '@nestjs/typeorm';
import { SummonersEntity } from './entities/summoners.entity';

const configService = new ConfigService();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: configService.get<string>('DB_HOST'),
      port: configService.get<number>('DB_PORT'),
      username: configService.get<string>('DB_USER'),
      password: configService.get<string>('DB_PASS'),
      database: configService.get<string>('DB_NAME'),
      entities: [SummonersEntity],
      synchronize: true,
      logging: false,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validationSchema: Joi.object({
        APP_PORT: Joi.number().required(),
        NODE_ENV: Joi.string().valid('development', 'production').required(),
        DB_USER: Joi.string().required(),
        DB_HOST: Joi.string().ip().required(),
        DB_PORT: Joi.number().required(),
        DB_PASS: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        RIOT_API_KEY: Joi.string()
          .required()
          .messages({
            'string.base': 'Riot API key must be a string',
            'string.empty': 'Riot API key cannot be empty',
            'any.required': 'Riot API key is required',
          })
          .label('Riot API Key'),
        RIOT_URL: Joi.string().required(),
      }),
    }),
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
