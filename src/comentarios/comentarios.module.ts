import { Module, forwardRef } from '@nestjs/common';
import { ComentariosService } from './services/comentarios.service';
import { ComentariosController } from './controllers/comentarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comentario } from './entities/comentario.entity';
import { TareaModule } from 'src/tarea/tarea.module';

@Module({
  controllers: [ComentariosController],
  imports: [
    TypeOrmModule.forFeature([Comentario]),
    forwardRef(() => TareaModule), // Envolver TareaModule con forwardRef
  ],
  providers: [ComentariosService],
  exports: [TypeOrmModule, ComentariosService], // Exportar ComentariosService si es necesario en TareaModule
})
export class ComentariosModule {}
