// equipo.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Equipo } from '../entities/equipo.entity';
import { CreateEquipoDto } from '../dto/create-equipo.dto';
import { UpdateEquipoDto } from '../dto/update-equipo.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class EquipoService {
  constructor(
    @InjectRepository(Equipo)
    private equipoRepository: Repository<Equipo>,
  ) {}

  async findAll(): Promise<Equipo[]> {
    return this.equipoRepository.find();
  }

  async createEquipo(createEquipoDto: CreateEquipoDto): Promise<Equipo> {
    const nuevoEquipo = this.equipoRepository.create(createEquipoDto);
    return this.equipoRepository.save(nuevoEquipo);
  }
  async findOneByName(nombre: string): Promise<Equipo> {
    return this.equipoRepository.findOne({ where: { nombre } });
  }
  async updateEquipo(nombre: string, updateEquipoDto: UpdateEquipoDto): Promise<Equipo> {
    const equipo = await this.equipoRepository.findOne({ where: { nombre } });
    if (!equipo) {
      throw new NotFoundException(`Equipo con nombre "${nombre}" no encontrado`);
    }

    if (updateEquipoDto.nombre) {
      equipo.nombre = updateEquipoDto.nombre;
    }

    return this.equipoRepository.save(equipo);
  }
  async deleteEquipo(equipo: Equipo): Promise<void> {
    // Elimina el equipo
    await this.equipoRepository.remove(equipo);
  }

  async addUserToEquipo(equipo: Equipo, user: User): Promise<Equipo> {
    if (!equipo) {
      throw new NotFoundException('Equipo no encontrado'); // Maneja el caso donde equipo es undefined
    }
  
    if (!equipo.users) {
      equipo.users = []; // Inicializa la propiedad users si es undefined
    }
  
    equipo.users.push(user); // Agrega el usuario al equipo
    return this.equipoRepository.save(equipo); // Guarda el equipo actualizado en la base de datos
  }
  
}

