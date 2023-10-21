import { Body, Controller, Post, UsePipes, ValidationPipe, Get, UseGuards, Request } from '@nestjs/common';
import { register } from 'module';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { log, profile } from 'console';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}
    @Post('register')
    @UsePipes(new ValidationPipe()) 
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }
        

    @Post('login')
        login(
            @Body() loginDto: LoginDto,) {
            return this.authService.login(loginDto);
        }

    @Get('profile')
    @UseGuards(AuthGuard)
    profile(
        @Request()req){
        return req.user;
    }

}
