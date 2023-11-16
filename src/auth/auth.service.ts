import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { PasswordRecovery } from 'src/password-recovery/password_recoveries.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    @InjectRepository(PasswordRecovery)
    private readonly passwordRecoveryRepository: Repository<PasswordRecovery>,
  ) {}
  async sendRecoveryCode(user: User): Promise<void> {
    // Generar código y configurar la fecha de expiración
    const code = this.generateRecoveryCode();
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 1); // Ejemplo: expira en 1 hora

    // Guardar el código en la base de datos
    const recovery = new PasswordRecovery();
    recovery.code = code;
    recovery.expiresAt = expirationDate;
    recovery.user = user;
    await this.passwordRecoveryRepository.save(recovery);

    // Enviar correo electrónico al usuario con el código
    await this.sendRecoveryEmail(user.email, code);
  }
    sendRecoveryEmail(email: any, code: any) {
        throw new Error('Method not implemented.');
    }
    generateRecoveryCode(): string {
        const length = 8;
        const charset = "0123456789";
        let code = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            code += charset.charAt(randomIndex);
        }
        return code;
        }
      
  async register({ username, email, password }: RegisterDto) {
    const user = await this.userService.findOneByEmail(email);

    if (user) {
      throw new BadRequestException('User already exists');
    }

    return await this.userService.create({
      username,
      email,
      password: await bcrypt.hash(password, 10),
    });
  }

  async login({ email, password }: LoginDto) {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { id: user.id, email: user.email };

    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      email,
    };
  }
}
