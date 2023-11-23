import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import config from './config/dataBaseConfig';
import { EquipoModule } from './equipo/equipo.module';
import { ProyectoService } from './proyecto/services/proyecto.service';
import { TareaController } from './tarea/controllers/tarea.controller';
import { ProyectoModule } from './proyecto/proyecto.module';

@Module({
  controllers: [AppController,TareaController],
  providers: [AppService, ProyectoService],
  imports: [TypeOrmModule.forRoot(config), UsersModule, AuthModule, ProfileModule,EquipoModule,ProyectoModule]
})
export class AppModule {}
