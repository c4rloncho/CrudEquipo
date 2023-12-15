// tarea.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TareaService } from './services/tarea.service';
import { TareaController } from './controllers/tarea.controller';
import { Tarea } from './entities/tarea.entity';
import { Proyecto } from '../proyecto/entities/proyecto.entity';
import { User } from '../users/entities/user.entity';
import { ComentariosModule } from 'src/comentarios/comentarios.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tarea, Proyecto, User]),
    forwardRef(() => ComentariosModule), // Envolver ComentariosModule con forwardRef
  ],
  controllers: [TareaController],
  providers: [TareaService],
  exports: [TypeOrmModule, TareaService], // Exportar TareaService si es necesario en ComentariosModule
})
export class TareaModule {}