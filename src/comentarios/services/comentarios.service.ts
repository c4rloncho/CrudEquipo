import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateComentarioDto } from '../dto/create-comentario.dto';
import { UpdateComentarioDto } from '../dto/update-comentario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comentario } from '../entities/comentario.entity';
import { Repository } from 'typeorm';
import { Tarea } from 'src/tarea/entities/tarea.entity';

@Injectable()
export class ComentariosService {
  constructor(  
  @InjectRepository(Comentario)
  private comentarioRepository: Repository<Comentario>,
  @InjectRepository(Tarea)
  private tareaRepository: Repository<Tarea>){};

  create(createComentarioDto: CreateComentarioDto) {
    return 'This action adds a new comentario';
  }

  findAll() {
    return `This action returns all comentarios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comentario`;
  }

  update(id: number, updateComentarioDto: UpdateComentarioDto) {
    return `This action updates a #${id} comentario`;
  }

  remove(id: number) {
    return `This action removes a #${id} comentario`;
  }
  async agregarComentarioATarea(idTarea: number, createComentarioDto: CreateComentarioDto): Promise<Comentario> {
    const tarea = await this.tareaRepository.findOne({where:{id: idTarea}});

    if (!tarea) {
      throw new NotFoundException(`No se encontró la tarea con ID ${idTarea}`);
    }
    
    const comentario = this.comentarioRepository.create({ contenido: createComentarioDto.contenido, tarea:tarea });
    return await this.comentarioRepository.save(comentario);
  }

  async editarContenidoComentario(idComentario: number, nuevoContenido: string): Promise<Comentario> {
    const comentario = await this.comentarioRepository.findOne({where:{id:idComentario}});

    if (!comentario) {
      throw new NotFoundException(`No se encontró el comentario con ID ${idComentario}`);
    }

    comentario.contenido = nuevoContenido;

    return await this.comentarioRepository.save(comentario);
  }
}
