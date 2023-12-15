// tarea.controller.ts
import { Body, Controller, Post, UseGuards, Request, Put, Patch, Param, UsePipes, ValidationPipe, Delete } from '@nestjs/common';
import { TareaService } from '../services/tarea.service';
import { CreateTareaDto } from '../dto/create-tarea.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UpdateTasksStatusesDto } from '../dto/update-tarea.dto';
import { ActualizarTareaDto } from '../dto/actualiza-tarea.dto';
import { EliminarTareaDto } from '../dto/eliminar-tarea.dto';
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


  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('actualizar/:id')
  async actualizarTarea(@Param('id') id: number, @Body() actualizarTareaDto: ActualizarTareaDto) {
    try {
      const tareaActualizada = await this.tareaService.actualizarTarea(id, actualizarTareaDto);
      return { mensaje: 'Tarea actualizada correctamente', tarea: tareaActualizada };
    } catch (error) {
      return { mensaje: 'Hubo un error al actualizar la tarea', error: error.message };
    }
  }
  @Delete(':id')
  @UsePipes(new ValidationPipe())
  async eliminarTarea(@Param() eliminarDto: EliminarTareaDto) {
    try{
      const idTarea = eliminarDto.id;
      await this.tareaService.eliminarTarea(idTarea);
      return { mensaje: 'Tarea eliminada correctamente' };
    }
   catch (error) {
    // Puedes personalizar el manejo de errores según tus necesidades
    return { mensaje: 'Error al eliminar la tarea', error: error.message };
    }
  }
}