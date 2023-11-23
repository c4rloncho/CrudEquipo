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
    async findOneByNombre(nombre: string) {
        const proyecto = this.proyectoRepository.findOne({ where: { nombre } }); 
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


      async deleteProyecto(id: number, userId: number): Promise<void> {
        const proyecto = await this.proyectoRepository.findOne({ where: { id } });
        if (!proyecto) {
          throw new NotFoundException(`Proyecto con ID ${id} no encontrado`);
        }
    
        // Verificar si el usuario es el creador del proyecto
        if (proyecto.creadorId !== userId) {
          throw new UnauthorizedException('No tienes permisos para eliminar este proyecto');
        }
    
        await this.proyectoRepository.remove(proyecto);
      }
}
 