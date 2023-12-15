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

    @UseGuards(AuthGuard) 
    @Get('user-equipos')
    async findEquiposByUser(@Req() req) {
      const userId = req.user.id; 
      console.log(userId);
       const equipos = await this.equipoService.findEquiposByUserId(userId);
      return {
         message: 'Equipos encontrados exitosamente',
         equipos,
       };
    }
    @UseGuards(AuthGuard)
    @Post(':idEquipo/asignar-rol/:idRol')
    async asignarRolAUsuarioEnEquipo(
      @Req() req,
      @Param('idEquipo') idEquipo: number,
      @Param('idRol') idRol: number,
    ) {
      try {
        const userId = req.user.id; 
        const usuario = await this.equipoService.asignarRolAUsuarioEnEquipo(userId, idEquipo, idRol);
        return { mensaje: 'Rol asignado correctamente a usuario en equipo', usuario };
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }
    
    @Get(':equipoId/users')
    findUsersByEquipoId(@Param('equipoId') equipoId: number) {
      return this.equipoService.findUsersByEquipoId(equipoId);
    }

    @Get(':id')
    findTeamById(@Param('id') id: number) {
      return this.equipoService.findOneById(id);
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
  @Delete(':nombre') // ELIMINAR EQUIPO
  async deleteEquipo(@Param('nombre') nombre: string) {
    const equipo = await this.equipoService.findOneByName(nombre);
    if (!equipo) {
      throw new NotFoundException(`Equipo con nombre "${nombre}" no encontrado`);
    }

    // Llama al servicio para eliminar el equipo
    await this.equipoService.deleteEquipo(equipo);

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

  @Get(':equipoId/proyectos')
  async getProyectosByEquipo(@Param('equipoId') equipoId: number): Promise<Proyecto[]> {
    return await this.equipoService.findProyectosByEquipoId(equipoId);
  }
}
