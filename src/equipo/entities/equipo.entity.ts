import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Proyecto } from 'src/proyecto/entities/proyecto.entity';

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
    name: 'proyecto_equipos_equipo', // Especifica el nombre de la tabla de unión
    joinColumn: {
      name: 'equipoId',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'proyectoId',
      referencedColumnName: 'id'
    }
  })
  proyectos: Proyecto[];
}