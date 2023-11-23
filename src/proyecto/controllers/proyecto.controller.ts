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

    @Get(':nombre')
    async findOneByNombre(@Param('nombre') nombre: string) {
        const proyecto = await this.proyectoService.findOneByNombre(nombre);
        if (!proyecto) {
        throw new NotFoundException('proyecto no encontrado');
        }
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
    @UseGuards(AuthGuard) // Asegurarse de que el usuario esté autenticado
    async deleteProyecto(@Param('id') id: number, @Req() req) {
        const userId = req.user.id; // Obtén el ID del usuario desde el token
        await this.proyectoService.deleteProyecto(id, userId);
        return {
        message: 'Proyecto eliminado exitosamente',
        };
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
}
