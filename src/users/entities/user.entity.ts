import { Equipo } from 'src/equipo/entities/equipo.entity';
import { Rol } from 'src/rol/entities/rol.entity';
import { Tarea } from 'src/tarea/entities/tarea.entity';
import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany, OneToMany } from 'typeorm';

@Entity({name :'users'}) // Nombre de la tabla en la base de datos
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, name: 'realName', type: 'varchar', length: 255 })
    realname: string;

    @Column({nullable: false, type: 'varchar', length: 255 })
    username: string;

    @Column({nullable: false, type: 'varchar', length: 255 })
    password: string;

    @Column({ unique:true, nullable: false, type: 'varchar', length: 255 })
    email: string;

    @Column({ type: 'varchar', length: 20, default: 'user' })
    rol: string;
    

    @OneToMany(()=> Tarea, tarea => tarea.user)
    @JoinTable()
    tareas: Tarea[];

    @ManyToMany(() => Equipo, equipo => equipo.users,{eager:true})
    @JoinTable()
    equipos: Equipo[];

    @ManyToMany(() => Rol)
    @JoinTable({ name: 'usuario_roles' }) // Nombre personalizado para la tabla intermedia
    roles: Rol[];
}
