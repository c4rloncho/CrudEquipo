import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Proyecto } from 'src/proyecto/entities/proyecto.entity';
import { Rol } from 'src/rol/entities/rol.entity';

@Entity()
export class Equipo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, name: 'nombre', type: 'varchar', length: 255 })
  nombre: string;

  // Añadir columna 'descripcion'
  @Column({ nullable: true, type: 'text' })
  descripcion: string;

  // Añadir columna 'fechaCreacion' que registra automáticamente la fecha de creación
  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @ManyToMany(() => User,(user) => user.equipos)
  users: User[]

  @ManyToMany(() => Proyecto, proyecto => proyecto.equipos)
  @JoinTable({
    name: 'proyecto_equipos_equipo', // El nombre de la tabla de unión
    joinColumn: {
      name: 'equipoId', // El nombre de la columna en la tabla de unión que referencia a esta entidad (Equipo)
      referencedColumnName: 'id', // El nombre de la columna en la entidad Equipo que es la clave primaria
    },
    inverseJoinColumn: {
      name: 'proyectoId', // El nombre de la columna en la tabla de unión que referencia a la entidad relacionada (Proyecto)
      referencedColumnName: 'id', // El nombre de la columna en la entidad Proyecto que es la clave primaria
    },
  })
  proyectos: Proyecto[];

  @ManyToMany(()=>Rol,{eager:true})
  @JoinTable()
  rolesEquipo: Rol[];
}