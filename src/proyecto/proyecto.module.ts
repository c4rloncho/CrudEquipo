import { Module } from '@nestjs/common';
import { ProyectoService } from './services/proyecto.service';
import { ProyectoController } from './controllers/proyecto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proyecto } from './entities/proyecto.entity';
import { EquipoModule } from '../equipo/equipo.module';

@Module({
  imports: [TypeOrmModule.forFeature([Proyecto]),EquipoModule], 
  controllers: [ProyectoController],
  providers: [ProyectoService],
  exports: [ProyectoService, TypeOrmModule] 
})
export class ProyectoModule {}