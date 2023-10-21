import { Injectable } from '@nestjs/common';
import {Repository} from 'typeorm';
import {UsersService} from './../users/users.service';

@Injectable()
export class ProfileService {

    constructor(
        private readonly usersServices: UsersService,
    ){}

    async getProfile(id : number){
        const user = await this.usersServices.findOne(id);
        return user;
    }

    async updateProfile(id: number, data: any){
        const user = await this.usersServices.update(id, data);
        return user;
    }

}
