import { Equipo } from 'src/equipo/entities/equipo.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn } from 'typeorm';


@Entity()
export class Proyecto {
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
  
  @ManyToMany(() => Equipo)
  @JoinTable()
  equipos: Equipo[];
}