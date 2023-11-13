import { Module } from '@nestjs/common';
import { PasswordRecoveryController } from './controllers/password-recovery.controller';
import { PasswordRecoveryService } from './services/password-recovery.service';
import { UsersService } from 'src/users/users.service';

@Module({
    controllers:[PasswordRecoveryController],
    providers:[PasswordRecoveryService],
    imports:[UsersService],
    exports:[PasswordRecoveryService]
})
export class PasswordRecoveryModule {

}
