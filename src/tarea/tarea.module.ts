import { Module } from "module";
import { ProyectoModule } from "src/proyecto/proyecto.module";
import { UsersModule } from "src/users/users.module";
import { TareaController } from "./controllers/tarea.controller";
import { TareaService } from "./services/tarea.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tarea } from "./entities/tarea.entity";
import { EquipoModule } from "src/equipo/equipo.module";

@Module({
    imports: [TypeOrmModule.forFeature([Tarea]),
    EquipoModule,
    ProyectoModule,
    UsersModule],
    controllers: [TareaController],
    providers: [TareaService],
    exports: [TypeOrmModule,TareaService]

})
export class TareaModule{}