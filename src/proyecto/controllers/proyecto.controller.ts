import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProyectoService } from '../services/proyecto.service';
import { CrearProyectoDto } from '../dto/create-proyecto.dto';
import { UpdateProyectoDto } from '../dto/update-proyecto.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

    @Controller('proyecto')
    export class ProyectoController {
    constructor(private readonly proyectoService: ProyectoService) {}

    @Get(':id')
    async findOneById(@Param('id') id: number) {
        const proyecto = await this.proyectoService.findOneById(id);
        if (!proyecto) {
            throw new NotFoundException('Proyecto no encontrado');
        }
        return proyecto;
    }
    @Put(':id')
    async updateProyecto(
        @Param('id') id: number,
        @Body() updateProyectoDto: UpdateProyectoDto,
    ) {
        const proyecto = await this.proyectoService.updateProyecto(
        id,
        updateProyectoDto,
        );
        return {
        message: 'Proyecto actualizado exitosamente',
        proyecto,
        };
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async deleteProyecto(@Param('id') id: number) {
      try {
        await this.proyectoService.deleteProyecto(id);
        return { message: 'Proyecto eliminado exitosamente' };
      } catch (error) {
        throw new HttpException(error.response || 'Error interno del servidor', error.status || HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    @Post('create')
    @UseGuards(AuthGuard) // Aplica el AuthGuard a la ruta
    async createProyecto(
        @Body() createProyectoDto: CrearProyectoDto,
        @Req() request: any,
    ) {
        // request.user ahora debería contener el payload del token JWT verificado
        const creadorId = request.user.id;
        console.log(creadorId) // Asegúrate de que la propiedad coincida con la nomenclatura de tu payload JWT
        try {
        const proyecto = await this.proyectoService.crearProyecto(
            createProyectoDto,
            creadorId,
        );
        return {
            message: 'Proyecto creado con éxito',
            proyecto,
        };
        } catch (error) {
        // Manejo de errores
        throw new HttpException(
            {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Error al crear el proyecto',
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
        );
        }
    }
    @Get(':id/equipos')
    async findTeamsByProyectoId(@Param('id') id: number) {
      const equipos = await this.proyectoService.findTeamsByProyectoId(id);
      if (!equipos) {
        throw new NotFoundException(`Equipos para el proyecto con ID ${id} no encontrados`);
      }
      return equipos;
    }
    //Todas las tareas de un proyecto
    @Get(':id/tareas')
    getTareasDeProyecto(@Param('id') proyectoId: number) {
      return this.proyectoService.getTareasDeProyecto(proyectoId);
    }
}
