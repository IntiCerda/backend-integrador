import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TryModule } from './try/try.module';
import './firebase.config'; 

@Module({
  imports: [UsersModule, AuthModule, TryModule], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}