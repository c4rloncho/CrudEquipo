import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipoController } from './controllers/equipo.controller';
import { EquipoService } from './services/equipo.service';
import { Equipo } from './entities/equipo.entity';
import { UsersModule } from '../users/users.module'; // Asegúrate de importar UsersModule
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([Equipo]),
    UsersModule,HttpModule // Agrega UsersModule a las importaciones
  ],
  controllers: [EquipoController],
  providers: [EquipoService],
  exports: [EquipoService, TypeOrmModule.forFeature([Equipo])],
})
export class EquipoModule {}