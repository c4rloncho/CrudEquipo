import { Comentario } from "src/comentarios/entities/comentario.entity";
import { Proyecto } from "src/proyecto/entities/proyecto.entity";
import { 
  Column, 
  CreateDateColumn, 
  Entity, 
  JoinColumn, 
  ManyToOne, 
  OneToMany, 
  PrimaryGeneratedColumn, 
  UpdateDateColumn 
} from "typeorm";

@Entity()
export class Tarea {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @ManyToOne(() => Proyecto)
  @JoinColumn({ name: 'proyectoId' })
  proyecto: Proyecto;

  @OneToMany(()=> Comentario, (comentario) => comentario.tarea)
  comentarios: Comentario[];

  @Column({ nullable: true }) // Hace que el campo creador sea opcional
  creador?: string;

  @Column({ nullable: true })
  responsable?: string | null;

  @Column({ type: 'date', nullable: true })
  fechaInicio?: Date | null;

  @Column({ type: 'date', nullable: true })
  fechaTermino?: Date | null;

  @Column({ default: 'pendiente' })
  estado: string;

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn()
  fechaActualizacion: Date;
}
