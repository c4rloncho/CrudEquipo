// tarea.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TareaService } from './services/tarea.service';
import { TareaController } from './controllers/tarea.controller';
import { Tarea } from './entities/tarea.entity';
import { Proyecto } from '../proyecto/entities/proyecto.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tarea, Proyecto, User])],
  controllers: [TareaController],
  providers: [TareaService],
})
export class TareaModule {}
