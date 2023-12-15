import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tarea } from '../entities/tarea.entity';
import { Proyecto } from 'src/proyecto/entities/proyecto.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateTareaDto } from '../dto/create-tarea.dto';
import { UpdateTasksStatusesDto } from '../dto/update-tarea.dto';
import { ActualizarTareaDto } from '../dto/actualiza-tarea.dto';
import { Comentario } from 'src/comentarios/entities/comentario.entity';


@Injectable()
export class TareaService {
  constructor(
    @InjectRepository(Tarea)
    private tareaRepository: Repository<Tarea>,
    @InjectRepository(Proyecto)
    private proyectoRepository: Repository<Proyecto>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Comentario)
    private comentarioRepository: Repository<Comentario>,
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
      estado: 'toDo',
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



  async actualizarTarea(id: number, actualizarTareaDto: ActualizarTareaDto): Promise<Tarea> {
    const tareaExistente = await this.tareaRepository.findOne({where:{id: id  }});
  
    if (!tareaExistente) {
      throw new Error(`No se encontró la tarea con ID ${id}`);
    }
  
    // Verificar cada propiedad individualmente
    if (actualizarTareaDto.nombre !== undefined) {
      tareaExistente.nombre = actualizarTareaDto.nombre;
    }
  
    if (actualizarTareaDto.descripcion !== undefined) {
      tareaExistente.descripcion = actualizarTareaDto.descripcion;
    }
  
    if (actualizarTareaDto.responsable !== undefined) {
      tareaExistente.responsable = actualizarTareaDto.responsable;
    }
  
    // Puedes agregar más if para otras propiedades según sea necesario
  
    // Guardar la tarea actualizada en la base de datos
    const tareaGuardada = await this.tareaRepository.save(tareaExistente);
  
    return tareaGuardada;
  }
  async eliminarTarea(id: number): Promise<void> {
    const tarea = await this.tareaRepository.findOne({where:{id: id}});

    if (!tarea) {
      throw new NotFoundException(`No se encontró la tarea con ID ${id}`);
    }

    await this.tareaRepository.remove(tarea);
  }

  async agregarComentarioATarea(idTarea: number, contenido: string): Promise<Comentario> {
    const tarea = await this.tareaRepository.findOne({where:{id: idTarea}});

    if (!tarea) {
      throw new NotFoundException(`No se encontró la tarea con ID ${idTarea}`);
    }

    const comentario = this.comentarioRepository.create({ contenido, tarea });
    return await this.comentarioRepository.save(comentario);
  }
}
