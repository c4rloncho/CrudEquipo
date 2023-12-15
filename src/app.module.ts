// app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import config from './config/dataBaseConfig';
import { EquipoModule } from './equipo/equipo.module';
import { ProyectoModule } from './proyecto/proyecto.module';
import { TareaModule } from './tarea/tarea.module'; // Asegúrate de importar TareaModule
import { ComentariosModule } from './comentarios/comentarios.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    TypeOrmModule.forRoot(config),
    UsersModule,
    AuthModule,
    ProfileModule,
    EquipoModule,
    ProyectoModule,
    TareaModule,
    ComentariosModule, // Añade TareaModule a la lista de imports
  ],
})
export class AppModule {}
