import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateProfileDto } from 'src/profile/dto/updateProfile.dto'; 
import { NotFoundException } from '@nestjs/common';


@Injectable()
export class UsersService {

  constructor( @InjectRepository(User)private readonly usersRepository: Repository<User>,) {}

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto);
  }

  findOneByEmail(email: string) {
    return this.usersRepository.findOneBy({ email })
  }


  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return this.usersRepository.findOne({where: {id: id}});
}


  async update(id: number, updateUserDto: UpdateProfileDto) {
    // Primero, encontrar el usuario por ID
    const user = await this.usersRepository.findOne({where: {id:id}});
    
    // Si no se encuentra el usuario, se puede lanzar un error.
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Actualizar el usuario con la nueva información
    Object.assign(user, updateUserDto);

    // Guardar los cambios en la base de datos
    return this.usersRepository.save(user);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
