import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PasswordRecovery } from '../password_recoveries.entity';
import { User } from 'src/users/entities/user.entity';
import * as nodemailer from 'nodemailer';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PasswordRecoveryService {
    constructor(
        @InjectRepository(PasswordRecovery)
        private readonly passwordRecoveryRepository: Repository<PasswordRecovery>,
        private userService: UsersService,
        @InjectRepository(User) private readonly usersRepository: Repository<User>
    ) {}

    async createRecoveryRequest(email: string): Promise<string> {
        // Verifica si el usuario existe
        const user = await this.userService.findOneByEmail(email);

        // Genera un token
        const token = this.generateToken();

        // Crea la solicitud de recuperación de contraseña asociada al usuario
        const recoveryRequest = this.passwordRecoveryRepository.create({
            email,
            token,
            user,
        });

        await this.passwordRecoveryRepository.save(recoveryRequest);

        // Envía el correo electrónico con el token
        await this.sendRecoveryEmail(email, token);

        return token;
    }
    private generateToken(): string {
        // Genera un número aleatorio de 6 dígitos
        const randomNumber = Math.floor(100000 + Math.random() * 900000);
        return randomNumber.toString();
      }
      

      private  generateRecoveryCode(): string {
        const length = 8;
        const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let code = "";
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * charset.length);
          code += charset.charAt(randomIndex);
        }
        return code;
      }
      

    private async sendRecoveryEmail(email: string, token: string): Promise<void> {
        const transporter = nodemailer.createTransport({
            // Configuración del servicio de correo
            // Consulta la documentación de nodemailer para más detalles
        });

        const mailOptions = {
            from: 'tu_correo@gmail.com',
            to: email,
            subject: 'Recuperación de Contraseña',
            text: `Utiliza este token para recuperar tu contraseña: ${token}`,
        };

        await transporter.sendMail(mailOptions);
    }
}
