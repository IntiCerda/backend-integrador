import { Module } from '@nestjs/common';
import { TryService } from './try.service';
import { TryController } from './try.controller';

@Module({
  controllers: [TryController],
  providers: [TryService],
})
export class TryModule {}