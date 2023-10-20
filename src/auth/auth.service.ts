import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
        
        ) {}

    async register({username, email, password}: RegisterDto)  {
        
        const user = await this.userService.findOneByEmail(email);

        if(user) {
            throw new BadRequestException('User already exists');
        }
        
        return await this.userService.create({
            username, 
            email, 
            password: await bcrypt.hash(password, 10)
        }); 
    }

    async login({email,password}: LoginDto) {
        const user = await this.userService.findOneByEmail(email);
        
        if(!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);  

        if(!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = {email: user.email};

        const token = await this.jwtService.signAsync(payload);

        return {
            token,
            email,
        };
    }

}
