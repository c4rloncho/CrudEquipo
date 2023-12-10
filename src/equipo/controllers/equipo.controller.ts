// equipo.controller.ts
import { Controller, Post, Body, HttpStatus, HttpException, Get, NotFoundException, Param, Put, Delete, UseGuards, Req } from '@nestjs/common';
import { EquipoService } from '../services/equipo.service';
import { CreateEquipoDto } from '../dto/create-equipo.dto';
import { UpdateEquipoDto } from '../dto/update-equipo.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipo } from '../entities/equipo.entity';
import { Repository } from 'typeorm';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Proyecto } from 'src/proyecto/entities/proyecto.entity';
@Controller('equipos')
export class EquipoController {
  constructor(
    private equipoService: EquipoService,) {}

    @UseGuards(AuthGuard) // Utiliza tu guardia de autenticación aquí
    @Get('user-equipos') // Cambia la ruta según tus necesidades
    async findEquiposByUser(@Req() req) {
      const userId = req.user.id; // Obtén el ID del usuario desde el token
      console.log(userId);
       const equipos = await this.equipoService.findEquiposByUserId(userId);
      return {
         message: 'Equipos encontrados exitosamente',
         equipos,
       };
    }
    
    @Get(':equipoId/users')
    findUsersByEquipoId(@Param('equipoId') equipoId: number) {
      return this.equipoService.findUsersByEquipoId(equipoId);
    }

    @Get(':id')
    findTeamById(@Param('id') id: number) {
      return this.equipoService.findOneById(id);
    }
    @Get('verificar/:id')
    async VerificarTeam(@Param('id')id:number){
      const verificar = this.VerificarTeam(id);
      return verificar;
    }

    @Post('register') // CREAR EQUIPO
    async createEquipo(@Body() createEquipoDto: CreateEquipoDto) {
      try {
        const equipo = await this.equipoService.createEquipo(createEquipoDto);
        return {
          message: `Equipo registrado exitosamente: ${equipo.nombre}`,
          equipo,
        };
      } catch (error) {
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error al registrar el equipo',
        }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    
  @Get(':nombre') // BUSCAR EQUIPO POR NOMBRE
  async findOneByName(@Param('nombre') nombre: string) {
    const equipo = await this.equipoService.findOneByName(nombre);
    if (!equipo) {
      throw new NotFoundException(`Equipo con nombre "${nombre}" no encontrado`);
    }
    return {
      message: 'Equipo encontrado exitosamente',
      equipo,
    };
  }
  @Delete(':id') // ELIMINAR EQUIPO
  async deleteEquipo(@Param('id') id: number) {
    try{
      await this.equipoService.deleteEquipo(id);
    }

    // Llama al servicio para eliminar el equipo
    

    return {
      message: 'Equipo eliminado exitosamente',
    };
  }

  @Get() // BUSCAR TODOS LOS EQUIPOS
  async findAll() {
    try {
      const equipos = await this.equipoService.findAll(); // Llama al método findAll del servicio
      return {
        message: 'Equipos encontrados exitosamente',
        equipos,
      };
    } catch (error) {
      throw new HttpException('Error al buscar equipos', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':nombre') // ACTUALIZAR EQUIPO
  async updateEquipo(@Param('nombre') nombre: string, @Body() updateEquipoDto: UpdateEquipoDto) {
    const equipo = await this.equipoService.updateEquipo(nombre, updateEquipoDto);
    return {
      message: 'Equipo actualizado exitosamente',
      equipo,
    };
  }

  @Post(':equipoNombre/users/:username')
  async addUserToTeam(
    @Param('username') username: string,
    @Param('equipoNombre') equipoNombre: string
  ) {
    console.log(username, equipoNombre);
    await this.equipoService.addUserToTeam(username, equipoNombre);
    return { message: 'Usuario agregado al equipo exitosamente' };
  }
/*
  @Get(':equipoId/proyectos')
  async getProyectosByEquipo(@Param('equipoId') equipoId: number): Promise<Proyecto[]> {
    return await this.equipoService.findProyectosByEquipoId(equipoId);
  }
*/
// controlador de equipo
@Post('agregar-proyecto')
async AgregarProyectoEquipo(@Body() body: { proyectoId: number; equipoId: number }) {
  try {
    const equipo = await this.equipoService.AsociarProyectoEquipo(body.proyectoId, body.equipoId);
    return {
      message: 'Equipo en proyecto obtenido con éxito',
      equipo,
    };
  } catch (error) {
    // Manejar errores, por ejemplo, si el servicio de equipo lanza una excepción
    return {
      message: 'Error al obtener el equipo en proyecto',
      error: error.message,
    };
  }
}
  @Post('desasociar-proyecto')
  async desasociarProyecto(@Body() data: { proyectoId: number; equipoId: number }): Promise<void> {
    return this.equipoService.desasociarProyecto(data.proyectoId, data.equipoId);
  }
}
