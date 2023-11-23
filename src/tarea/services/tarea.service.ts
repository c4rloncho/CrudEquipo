import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tarea } from '../entities/tarea.entity';

@Injectable()
export class TareaService {
  constructor(
    @InjectRepository(Tarea)
    private tareaRepository: Repository<Tarea>,
  ) {}

  async createTarea(tareaData: Partial<Tarea>): Promise<Tarea> {
    const tarea = this.tareaRepository.create(tareaData);
    return await this.tareaRepository.save(tarea);
  }

  async getTareas(queryParams: any): Promise<Tarea[]> {
    // Implementar lógica para filtrar tareas según queryParams
    // Por ejemplo, buscar por nombre, responsable o estado
    return await this.tareaRepository.find();
  }

  async updateTarea(id: number, tareaData: Partial<Tarea>): Promise<Tarea> {
    const tarea = await this.tareaRepository.findOne(id);
    if (!tarea) {
      throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    }

    this.tareaRepository.merge(tarea, tareaData);
    return await this.tareaRepository.save(tarea);
  }

  async deleteTarea(id: number): Promise<void> {
    const tarea = await this.tareaRepository.findOne(id);
    if (!tarea) {
      throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    }

    await this.tareaRepository.remove(tarea);
  }
}
