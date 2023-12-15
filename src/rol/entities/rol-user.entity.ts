import { User } from "src/users/entities/user.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Rol } from "./rol.entity";
import { Equipo } from "src/equipo/entities/equipo.entity";

@Entity()
export class UsuarioRolEquipo {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'usuario_id' })
  usuario: User;

  @ManyToOne(() => Rol)
  @JoinColumn({ name: 'rol_id' })
  rol: Rol;

  @ManyToOne(() => Equipo)
  @JoinColumn({ name: 'equipo_id' })
  equipo: Equipo;
}
