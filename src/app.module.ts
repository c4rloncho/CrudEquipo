import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { PasswordRecoveryService } from './password-recovery/password-recovery.service';
import { PasswordRecoveryService } from './password-recovery/password-recovery.service';
import { PasswordRecoveryController } from './password-recovery/password-recovery/password-recovery.controller';
import { ControllersController } from './password-recovery/controllers/controllers.controller';
import { ServicesService } from './password-recovery/services/services.service';
import { ServicesService } from './password-recovery/password-recovery/services/services.service';
import { PaswwordRecoveryService } from './password-recovery/services/paswword-recovery/paswword-recovery.service';
import { PaswwordRecoveryController } from './password-recovery/controllers/paswword-recovery/paswword-recovery.controller';
import { ControllersController } from './password-recovery/controllers/controllers.controller';
import { PasswordRecoveryService } from './password-recovery/services/password-recovery/password-recovery.service';
import { Service } from './password-recovery/services/.service';
import { PasswordRecoveryController } from './password-recovery/controllers/password-recovery/password-recovery.controller';
import { PasswordRecoveryService } from './password-recovery/services/password-recovery/password-recovery.service';
import { PasswordRecoveryService } from './password-recovery/services/password-recovery/password-recovery.service';
import { PasswordRecoveryController } from './password-recovery/controllers/password-recovery/password-recovery.controller';
import { PasswordRecoveryController } from './password-recovery/password-recovery/password-recovery.controller';
import { PasswordRecoveryService } from './password-recovery/services/password-recovery/password-recovery.service';
import { ControllersController } from './password-recovery/controllers/controllers.controller';
import { ServicesService } from './password-recovery/services/services.service';
import { PasswordRecoveryController } from './password-recovery/password-recovery.controller';
import { PasswordRecoveryService } from './password-recovery/password-recovery.service';
import { PasswordRecoveryController } from './password-recovery/password-recovery.controller';
import { ControllerController } from './password-recovery/controller/controller.controller';
import { ServicesService } from './password-recovery/services/services.service';
import { PasswordRecoveryService } from './password-recovery/password-recovery.service';
import config from './config/dataBaseConfig';
import { EquipoModule } from './equipo/equipo.module';
@Module({
<<<<<<< Updated upstream
  controllers: [AppController],
  providers: [AppService],
  imports: [TypeOrmModule.forRoot(config), UsersModule, AuthModule, ProfileModule,EquipoModule]
=======
  controllers: [AppController, PasswordRecoveryController, ControllerController, ControllersController, PaswwordRecoveryController],
  providers: [AppService, PasswordRecoveryService, ServicesService, Service, PaswwordRecoveryService],
  imports: [TypeOrmModule.forRoot(config), UsersModule, AuthModule, ProfileModule]
>>>>>>> Stashed changes
})
export class AppModule {}
