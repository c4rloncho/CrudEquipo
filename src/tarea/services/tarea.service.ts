import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { Tarea } from '../entities/tarea.entity';
import { CreateTareaDto } from '../dto/create-tarea.dto';
import { UpdateTareaDto } from '../dto/update-tarea.dto';

@Injectable()
export class TareaService {
  constructor(
    @InjectRepository(Tarea)
    private tareaRepository: Repository<Tarea>,
  ) {}
  async findOneById(id:number){
    const tarea = this.tareaRepository.findOne({ where: {id}})
    return tarea;
  }
  async createTarea(tareaData: CreateTareaDto, creadorId: number): Promise<Tarea>{
    const tarea = this.tareaRepository.create(tareaData);
    tarea.creador = creadorId;
    return await this.tareaRepository.save(tarea);
  }

  async getTareas(queryParams: any): Promise<Tarea[]> {
    const options: FindManyOptions<Tarea> = {};

    if (queryParams.nombre) {
      options.where = { nombre: Like(`%${queryParams.nombre}%`) };
    }

    if (queryParams.responsable) {
      options.where = { responsable: Like(`%${queryParams.responsable}%`) };
    }

    if (queryParams.estado) {
      options.where = { estado: Like(`%${queryParams.estado}%`) };
    }

    return await this.tareaRepository.find(options);
  }

  async updateTarea(id: number, updateTarea: UpdateTareaDto): Promise<Tarea> {
    const tarea = await this.tareaRepository.findOne({where:{id}});
    if (!tarea) {
      throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    }
    this.tareaRepository.merge(tarea, updateTarea);
    return await this.tareaRepository.save(tarea);
  }
  async agregarResponable(id:number, responsableId:number) {
    const tarea = await this.tareaRepository.findOne({where:{id}});
    if(!tarea){
      throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    }
    else{
      tarea.responsable = responsableId;
    }
    return await this.tareaRepository.save(tarea);
  }
  async deleteTarea(id: number): Promise<void> {
    const tarea = await this.tareaRepository.findOne({where:{id}});
    if (!tarea) {
      throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    }

    await this.tareaRepository.remove(tarea);
  }
}
