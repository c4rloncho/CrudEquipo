import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Equipo } from '../entities/equipo.entity';
import { CreateEquipoDto } from '../dto/create-equipo.dto';

@Injectable()
export class EquipoService {
  constructor(
    @InjectRepository(Equipo)
    private equipoRepository: Repository<Equipo>,
  ) {}

// equipo.service.ts

  async createEquipo(createEquipoDto: CreateEquipoDto): Promise<Equipo> {
    const equipo = this.equipoRepository.create(createEquipoDto);
    return await this.equipoRepository.save(equipo);
  }

}
