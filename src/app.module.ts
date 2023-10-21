import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import config from './config/dataBaseConfig';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [TypeOrmModule.forRoot(config), UsersModule, AuthModule, ProfileModule]
})
export class AppModule {}
