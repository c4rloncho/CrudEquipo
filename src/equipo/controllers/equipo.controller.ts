// equipo.controller.ts
import { Controller, Post, Body, HttpStatus, HttpException, Get, NotFoundException, Param, Put, Delete } from '@nestjs/common';
import { EquipoService } from '../services/equipo.service';
import { CreateEquipoDto } from '../dto/create-equipo.dto';
import { UpdateEquipoDto } from '../dto/update-equipo.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipo } from '../entities/equipo.entity';
import { Repository } from 'typeorm';

@Controller('equipos')
export class EquipoController {
  constructor(
    private equipoService: EquipoService,
    private userService: UsersService,) {}
  @Post('register')
  async createEquipo(@Body() createEquipoDto: CreateEquipoDto) {
    try {
      const equipo = await this.equipoService.createEquipo(createEquipoDto);
      return {
        message: 'Equipo registrado exitosamente'+(equipo.nombre),
        equipo,
      };
    } catch (error) {
      throw new HttpException('Error al registrar el equipo', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @Get(':nombre')
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
  @Delete(':nombre')
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

  @Get()
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

  @Put(':nombre')
  async updateEquipo(@Param('nombre') nombre: string, @Body() updateEquipoDto: UpdateEquipoDto) {
    const equipo = await this.equipoService.updateEquipo(nombre, updateEquipoDto);
    return {
      message: 'Equipo actualizado exitosamente',
      equipo,
    };
  }

  @Post(':nombre/register')
  async addUserToEquipo(@Param('nombre') nombre: string, @Body() userData: { username: string }) {
    const equipo = await this.equipoService.findOneByName(nombre);
    if (!equipo) {
      throw new NotFoundException(`Equipo con nombre "${nombre}" no encontrado`);
    }
    const user = await this.userService.findOneByUsername(userData.username);

    if (!user) {
      throw new NotFoundException(`Usuario con nombre de usuario "${userData.username}" no encontrado`);
    }

    const updatedEquipo = await this.equipoService.addUserToEquipo(equipo, user);

    return {
      message: 'Usuario agregado exitosamente al equipo',
      equipo: updatedEquipo,
    };
  }
}
