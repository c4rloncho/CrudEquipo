import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CrearProyectoDto } from '../dto/create-proyecto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proyecto } from '../entities/proyecto.entity';
import { UpdateProyectoDto } from '../dto/update-proyecto.dto';
import { Equipo } from 'src/equipo/entities/equipo.entity';

@Injectable()
export class ProyectoService {

    constructor(
        @InjectRepository(Proyecto)
        private proyectoRepository: Repository<Proyecto>,
        @InjectRepository(Equipo)
        private equipoRepository: Repository<Equipo>,
    ) { }
    async findOneById(id: number) {
      const proyecto = await this.proyectoRepository.findOne({ where: { id } });
      return proyecto;
  }


      async crearProyecto(createProyectoDto: CrearProyectoDto, creadorId: number) {
        const newProyecto = this.proyectoRepository.create(createProyectoDto);
        newProyecto.creadorId = creadorId;
        console.log(newProyecto)
        if (createProyectoDto.equipoIds) {
          
          const equipos = await this.equipoRepository.findByIds(createProyectoDto.equipoIds);
          newProyecto.equipos = equipos;
        }
        await this.proyectoRepository.save(newProyecto);
        return newProyecto;
      }
  

    async updateProyecto(id: number, updateProyectoDto: UpdateProyectoDto): Promise<Proyecto> {
        const proyecto = await this.proyectoRepository.findOne({ where: { id } });
        if (!proyecto) {
          throw new NotFoundException(`Proyecto con ID ${id} no encontrado`);
        }
      
        if (updateProyectoDto.nombre) {
          proyecto.nombre = updateProyectoDto.nombre;
        }
      
        if (updateProyectoDto.descripcion) {
          proyecto.descripcion = updateProyectoDto.descripcion;
        }
      
        return this.proyectoRepository.save(proyecto);
      }


      async deleteProyecto(id: number): Promise<void> {
        // Comienza una transacción
        const queryRunner = this.proyectoRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
    
        try {
          // Encuentra el proyecto que se quiere eliminar
          const proyecto = await queryRunner.manager.findOne( Proyecto, {where: {id}} );
          if (!proyecto) {
            throw new NotFoundException(`Proyecto con ID ${id} no encontrado`);
          }
    
          // Elimina las relaciones en la tabla de unión
          await queryRunner.manager.delete('proyecto_equipos_equipo', { proyectoId: id });
    
          // Elimina el proyecto
          await queryRunner.manager.delete(Proyecto, { id });
    
          // Confirma la transacción
          await queryRunner.commitTransaction();
        } catch (error) {
          // Si hay un error, revierte la transacción
          await queryRunner.rollbackTransaction();
          throw error;
        } finally {
          // Libera el query runner
          await queryRunner.release();
        }
      }
      async findTeamsByProyectoId(id: number): Promise<Equipo[]> {
        const proyecto = await this.proyectoRepository
          .createQueryBuilder('proyecto')
          .leftJoinAndSelect('proyecto.equipos', 'equipo')
          .where('proyecto.id = :id', { id })
          .getOne();
      
        if (!proyecto) {
          throw new NotFoundException(`Proyecto con ID ${id} no encontrado`);
        }
      
        return proyecto.equipos;
      }
      async getTareasDeProyecto(proyectoId: number) {
        const proyecto = await this.proyectoRepository.findOne({
          where: { id: proyectoId },
          relations: ['tareas'], // Carga la relación de tareas
        });
    
        if (!proyecto) {
          throw new NotFoundException(`Proyecto con ID ${proyectoId} no encontrado`);
        }
    
        return proyecto.tareas;
      }
}
 