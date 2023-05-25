import { Module } from '@nestjs/common';
import { SummonersService } from './summoners.service';
import { SummonersController } from './summoners.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  exports: [SummonersService],
  controllers: [SummonersController],
  providers: [SummonersService],
})
export class SummonersModule {}
