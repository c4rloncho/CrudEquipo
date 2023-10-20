// equipo.controller.ts

import { Controller, Post, Body, HttpStatus, HttpException } from '@nestjs/common';
import { CreateEquipoDto } from '../dto/create-equipo.dto';
import { EquipoService } from '../services/equipo.service';

@Controller('equipos')
export class EquipoController {
  constructor(private readonly equipoService: EquipoService) {}

  @Post()
  async createEquipo(@Body() createEquipoDto: CreateEquipoDto) { // Utiliza el DTO
    try {
      const equipo = await this.equipoService.createEquipo(createEquipoDto);
      return {
        message: 'Equipo creado exitosamente',
        equipo,
      };
    } catch (error) {
      throw new HttpException('Error al crear el equipo', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
