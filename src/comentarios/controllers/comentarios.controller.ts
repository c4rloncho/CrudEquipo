import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ValidationPipe, UsePipes } from '@nestjs/common';
import { CreateComentarioDto } from '../dto/create-comentario.dto';
import { UpdateComentarioDto } from '../dto/update-comentario.dto';
import { ComentariosService } from '../services/comentarios.service';
import { Comentario } from '../entities/comentario.entity';
import { TareaService } from 'src/tarea/services/tarea.service';

@Controller('comentarios')
export class ComentariosController {
  constructor(private readonly comentariosService: ComentariosService,
    private readonly tareaService: TareaService) {}

  @Post()
  create(@Body() createComentarioDto: CreateComentarioDto) {
    return this.comentariosService.create(createComentarioDto);
  }

  @Get()
  findAll() {
    return this.comentariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comentariosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComentarioDto: UpdateComentarioDto) {
    return this.comentariosService.update(+id, updateComentarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comentariosService.remove(+id);
  }
  @Post(':idTarea/comentarios')
  @UsePipes(new ValidationPipe())
  async agregarComentarioATarea(
    @Param('idTarea') idTarea: number,
    @Body() body: { createComentarioDto: CreateComentarioDto },
  ): Promise<Comentario> {
    try {
      return await this.comentariosService.agregarComentarioATarea(idTarea, body.createComentarioDto);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
  @Patch(':idComentario')
  @UsePipes(new ValidationPipe())
  async editarContenidoComentario(
    @Param('idComentario') idComentario: number,
    @Body() editarContenidoDto: UpdateComentarioDto,
  ) {
    try {
      const comentario = await this.comentariosService.editarContenidoComentario(
        idComentario,
        editarContenidoDto.nuevoContenido,
      );
      return { mensaje: 'Contenido del comentario editado correctamente', comentario };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
  
}
