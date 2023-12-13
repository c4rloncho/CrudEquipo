import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tarea } from '../entities/tarea.entity';
import { Proyecto } from 'src/proyecto/entities/proyecto.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateTareaDto } from '../dto/create-tarea.dto';
import { UpdateTasksStatusesDto } from '../dto/update-tarea.dto';


@Injectable()
export class TareaService {
  constructor(
    @InjectRepository(Tarea)
    private tareaRepository: Repository<Tarea>,
    @InjectRepository(Proyecto)
    private proyectoRepository: Repository<Proyecto>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createTareaDto: CreateTareaDto, userId: number): Promise<Tarea> {
    const { nombre, descripcion, proyectoId } = createTareaDto;

    const proyecto = await this.proyectoRepository.findOne({ where: { id: proyectoId } });
    if (!proyecto) {
      throw new NotFoundException(`Proyecto con ID ${proyectoId} no encontrado`);
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
    }

    const tarea = this.tareaRepository.create({
      nombre,
      descripcion,
      proyecto, // Directamente asignamos el objeto del proyecto encontrado
      creador, // Directamente asignamos el objeto de usuario encontrado
      // Aquí puedes añadir más campos si son necesarios, como estado, fechaInicio, etc.
    });

    return this.tareaRepository.save(tarea);
  }

  async getTareas(queryParams: any): Promise<Tarea[]> {
    // Implementar lógica para filtrar tareas según queryParams
    // Por ejemplo, buscar por nombre, responsable o estado
    return await this.tareaRepository.find();
  }

  async updateTarea(id: number, tareaData: Partial<Tarea>): Promise<Tarea> {
    const tarea = await this.tareaRepository.findOne({where: {id}});
    if (!tarea) {
      throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    }

    this.tareaRepository.merge(tarea, tareaData);
    return await this.tareaRepository.save(tarea);
  }

  async deleteTarea(id: number): Promise<void> {
    const tarea = await this.tareaRepository.findOne({where: {id}});
    if (!tarea) {
      throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    }

    await this.tareaRepository.remove(tarea);
  }


  async updateStatuses(updateTasksStatusesDto: UpdateTasksStatusesDto): Promise<any> {
    const updatePromises = updateTasksStatusesDto.updatedTasks.map(async (taskUpdate) => {
      const tarea = await this.tareaRepository.findOne({where: {id: taskUpdate.id}});
      if (tarea) {
        tarea.estado = taskUpdate.estado;
        await this.tareaRepository.save(tarea);
      }
    });

    await Promise.all(updatePromises);
    return { message: 'Estados de tareas actualizados correctamente' };
  }
}
