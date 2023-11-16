import { Body, Controller, Post, UsePipes, ValidationPipe, Get, UseGuards, Request } from '@nestjs/common';
import { register } from 'module';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { log, profile } from 'console';
import { AuthGuard } from './guards/auth.guard';
import { PasswordRecoveryService } from 'src/password-recovery/services/password-recovery.service';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService,
        private readonly passwordRecovery: PasswordRecoveryService,
        private userService: UsersService,) {}
    @Post('register')
    @UsePipes(new ValidationPipe()) 
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }
    @Post('recover-password')
    async recoverPassword(@Body('email') email: string): Promise<void> {
      // Buscar usuario por correo electrónico
      const user = await this.userService.findOneByEmail(email);
  
      if (user) {
        // Iniciar el proceso de recuperación de contraseña
        await this.authService.sendRecoveryCode(user);
      }
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
