import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TareaService } from '../services/tarea.service';
import { Tarea } from '../entities/tarea.entity';
import { CrearProyectoDto } from 'src/proyecto/dto/create-proyecto.dto';
import { request } from 'http';
import { User } from 'src/users/entities/user.entity';
import { CreateTareaDto } from '../dto/create-tarea.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('tarea')
export class TareaController {
    constructor(
        private tareaService: TareaService,
    ) { }
    @Post('create')
    @UseGuards(AuthGuard)
    async createTarea(
      @Body() createTareaDto: CreateTareaDto,
      @Req() request: any,
    ) {
      // request.user ahora debería contener el payload del token JWT verificado
      const creadorId = request.user.id;
  
      try {
        const tarea = await this.tareaService.createTarea(createTareaDto, creadorId);
        
        return {
          message: 'Tarea creada con éxito',
          tarea,
        };
      } catch (error) {
        // Manejo de errores
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Error al crear la tarea',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

}
