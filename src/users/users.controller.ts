import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Equipo } from 'src/equipo/entities/equipo.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new BadRequestException('Invalid ID format');
    }
    return this.usersService.findOne(numericId);
  }
  @Get('obtener-equipos')
  @UseGuards(AuthGuard)
  async obtener(@Req() req) {
    const equipos: Equipo[] = await this.usersService.ObtenerEquipos(req.user.id);
    return {
      equipos,
      message: 'Equipos obtenidos con éxito',
    };
  }
  

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  } 

  
  @Get('profile')
  async getProfile(@Req() req) {
    if (!req.user || !req.user.id) {
      throw new UnauthorizedException();
    }
    return await this.usersService.findUserById(req.user.id);
  }
  



}
