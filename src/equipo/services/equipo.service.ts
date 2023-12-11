// equipo.service.ts
import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Equipo } from '../entities/equipo.entity';
import { CreateEquipoDto } from '../dto/create-equipo.dto';
import { UpdateEquipoDto } from '../dto/update-equipo.dto';
import { User } from 'src/users/entities/user.entity';
import { Proyecto } from 'src/proyecto/entities/proyecto.entity';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class EquipoService {

  constructor(
    @InjectRepository(Equipo)
    private equipoRepository: Repository<Equipo>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly httpService: HttpService
  ) { }

  async findAll(): Promise<Equipo[]> {
    return this.equipoRepository.find();
  }

  async createEquipo(createEquipoDto: CreateEquipoDto): Promise<Equipo> {
    const nuevoEquipo = this.equipoRepository.create(createEquipoDto);
    return await this.equipoRepository.save(nuevoEquipo);
  }
  async findById(id: number): Promise<Equipo | undefined> {
    return await this.equipoRepository.findOne({ where: { id } });
  }
  async findOneByName(nombre: string): Promise<Equipo> {
    return this.equipoRepository.findOne({ where: { nombre } });
  }
  async findOneById(id: number): Promise<Equipo> {
    return this.equipoRepository.findOne({ where: { id } });
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
  async deleteEquipo(equipoId: number): Promise<void> {
    // Elimina el equipo
    try {
      const equipo = await this.equipoRepository.findOne({ where: { id: equipoId } })
      if (!equipo) {
        throw new NotFoundException('equipo no encontrdo')
      }// al eliminar el equipo hay que quitar de todos los proyectos el id de este equipo
      this.desasociarEquipoDeProyectos(equipo);

      await this.equipoRepository.remove(equipo);
    }
    catch (error) {
      throw new BadRequestException('no se pudo agregar')
    }
  }
  
  private async desasociarEquipoDeProyectos(equipo: Equipo): Promise<void> {
    try {
      for (const proyectoId of equipo.proyectos) {
        // Desasociar el equipo del proyecto
        const response = await firstValueFrom(
          this.httpService.post(`http://localhost:3000/proyectos/desasociar-equipo`,{proyectoId: proyectoId,equipoId: equipo.id}) ,
        );

        if (response.status !== 200) {
          // Manejar el caso en el que la desasociación falla
          throw new HttpException('Error al desasociar el equipo del proyecto', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
    } catch (error) {
      // Manejar errores, por ejemplo, si hay un problema al realizar la solicitud HTTP
      // Puedes lanzar una excepción o manejarlo según tus necesidades
    }
  }

  async addUserToTeam(username: string, equipoNombre: string): Promise<void> {
    try {
      const equipo = await this.equipoRepository.findOne({
        where: { nombre: equipoNombre },
        relations: ['users']
      });

      if (!equipo) {
        throw new NotFoundException(`Equipo con nombre '${equipoNombre}' no encontrado.`);
      }

      // Buscando el usuario por su nombre de usuario
      const user = await this.userRepository.findOne({ where: { username: username } });

      if (!user) {
        throw new NotFoundException(`Usuario con nombre '${username}' no encontrado.`);
      }

      const isUserAlreadyInTeam = equipo.users.some(existingUser => existingUser.id === user.id);
      if (isUserAlreadyInTeam) {
        throw new BadRequestException(`El usuario '${username}' ya es miembro del equipo.`);
      }

      equipo.users.push(user);
      await this.equipoRepository.save(equipo);
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('El usuario ya es miembro de este equipo.');
      } else {
        console.log(error); // Puede ser útil para depuración
        throw new InternalServerErrorException('Ocurrió un error al procesar su solicitud.');
      }
    }
  }

  async findEquiposByUserId(userId: number): Promise<Equipo[]> {
    try {
      return await this.equipoRepository
        .createQueryBuilder('equipo') // 'equipo' es el alias para la entidad Equipo
        .innerJoinAndSelect('equipo.users', 'user', 'user.id = :userId', { userId })
        // Asegúrate de que 'equipo.users' sea el campo de la relación en la entidad Equipo
        .getMany();
    } catch (error) {
      throw new Error('No se pudieron obtener los equipos del usuario debido a un error en la base de datos.');
    }
  }
  async findUsersByEquipoId(equipoId: number): Promise<User[]> {
    const equipo = await this.equipoRepository
      .createQueryBuilder('equipo')
      .leftJoinAndSelect('equipo.users', 'user')
      .where('equipo.id = :equipoId', { equipoId })
      .getOne();

    if (!equipo) {
      throw new NotFoundException(`Equipo with ID ${equipoId} not found`);
    }

    return equipo.users;
  }

  /*async findProyectosByEquipoId(equipoId: number): Promise<Proyecto[]> {
    const equipo = await this.equipoRepository.findOne({
      where: { id: equipoId },
      relations: ['proyectos'], // Asegúrate de que 'proyectos' es el nombre correcto de la relación en la entidad Equipo
    });

    if (!equipo) {
      throw new NotFoundException(`El equipo con el ID ${equipoId} no fue encontrado`);
    }
    console.log(equipo)
    return equipo.proyectos;
  }*/

  async AsociarProyectoEquipo(proyectoId: number, equipoId: number): Promise<Equipo | null> {
    try {
      const equipo = await this.equipoRepository.findOne({ where: { id: equipoId } });
      //si se encuentra el eequipo se asocia al proyecto
      if (equipo) {
        equipo.proyectos = [...equipo.proyectos, proyectoId];
        await this.equipoRepository.save(equipo);
        return equipo;
      }
      else {
        throw new HttpException('Equipo not found', HttpStatus.NOT_FOUND);
      }

    }

    catch (error) {
      throw new HttpException(
        'error al asociar el proyecto', HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async desasociarProyecto(equipoId: number, proyectoId: number): Promise<void> {
    try {
      // Obtener el equipo
      const equipo = await this.equipoRepository.findOne({ where: { id: equipoId } });

      // Verificar si el equipo existe
      if (!equipo) {
        throw new HttpException(`Equipo con ID ${equipoId} not encontrado`, HttpStatus.NOT_FOUND);
      }

      // Desasociar el proyecto de la lista de proyectos en el equipo
      equipo.proyectos = equipo.proyectos.filter((id) => id !== proyectoId);

      // Guardar los cambios en el equipo
      await this.equipoRepository.save(equipo);
    } catch (error) {
      throw new HttpException('Error al desasociar el proyecto del equipo', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async findAllUsersByEquipoId(equipoId: number): Promise<User[]> {
    const equipo = await this.equipoRepository.findOne({
      where: { id: equipoId },
      relations: ['users'],
    });

    if (equipo) {
      return equipo.users;
    } else {
      // Manejar el caso cuando no se encuentra el equipo
      throw new Error(`Equipo with ID ${equipoId} not found.`);
    }
  }
}

