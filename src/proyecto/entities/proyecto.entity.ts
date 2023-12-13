import { Equipo } from 'src/equipo/entities/equipo.entity';
import { Tarea } from 'src/tarea/entities/tarea.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn, OneToMany } from 'typeorm';


@Entity()
export class Proyecto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, name: 'nombre', type: 'varchar', length: 255 })
  nombre: string;

  // Añadir columna 'descripcion'
  @Column({ nullable: true, type: 'text' })
  descripcion: string;bas

  // Añadir columna 'fechaCreacion' que registra automáticamente la fecha de creación
  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;
  
  @Column({ nullable: false, name: 'creador_id' }) // Nueva columna para almacenar el ID del creador
  creadorId: number;

  @ManyToMany(() => Equipo, equipo => equipo.proyectos)
  equipos: Equipo[];

  @OneToMany(() => Tarea, tarea => tarea.proyecto) // Añade esta línea para la relación inversa
  tareas: Tarea[];

}