// tarea.controller.ts
import { Body, Controller, Post, UseGuards, Request, Put } from '@nestjs/common';
import { TareaService } from '../services/tarea.service';
import { CreateTareaDto } from '../dto/create-tarea.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UpdateTasksStatusesDto } from '../dto/update-tarea.dto';
// Importa los guards que necesitas para la autenticación, si es que los utilizas.

@Controller('tareas')
export class TareaController {
  constructor(private readonly tareaService: TareaService) {}

  @UseGuards(AuthGuard) // Asume que estás utilizando un AuthGuard que usa estrategia 'jwt'
  @Post('create')
  async create(@Body() createTareaDto: CreateTareaDto, @Request() req) {
    // El ID del usuario se extrae del token decodificado que AuthGuard adjunta al objeto req
    const userId = req.user.id;
    return this.tareaService.create(createTareaDto, userId);
  }

  @UseGuards(AuthGuard) // Asegúrate de tener configurado el guard con JWT
  @Put('updateStatuses')
  updateTaskStatuses(@Body() updateTasksStatusesDto: UpdateTasksStatusesDto) {
    return this.tareaService.updateStatuses(updateTasksStatusesDto);
  }
}