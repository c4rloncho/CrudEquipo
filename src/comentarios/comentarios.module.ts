import { Module } from '@nestjs/common';
import { ComentariosService } from './services/comentarios.service';
import { ComentariosController } from './controllers/comentarios.controller';

@Module({
  controllers: [ComentariosController],
  providers: [ComentariosService],
})
export class ComentariosModule {}
