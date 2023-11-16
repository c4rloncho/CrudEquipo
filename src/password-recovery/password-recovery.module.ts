import { Module } from '@nestjs/common';
import { PasswordRecoveryController } from './controllers/password-recovery.controller';
import { PasswordRecoveryService } from './services/password-recovery.service';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordRecovery } from './password_recoveries.entity';

@Module({
    controllers:[PasswordRecoveryController],
    providers:[PasswordRecoveryService],
    imports:[TypeOrmModule.forFeature([PasswordRecovery]),UsersService],
    exports:[PasswordRecoveryService]
})
export class PasswordRecoveryModule {

}
