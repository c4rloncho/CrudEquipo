import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { register } from 'module';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { log } from 'console';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}
    

    @Post('register')
    @UsePipes(new ValidationPipe()) 
    register(
        @Body() 
        registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }
        

    @Post('login')
        login(
            @Body()
            loginDto: LoginDto,
        ) {
            return this.authService.login(loginDto);
        }

}
