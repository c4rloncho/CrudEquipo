import { Controller } from '@nestjs/common';
import { PasswordRecoveryService } from '../services/password-recovery.service';
@Controller('password-recovery')
export class PasswordRecoveryController {
    constructor (
        private passwordRecovery: PasswordRecoveryService ,
    ){}
}
