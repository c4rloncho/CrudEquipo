import { Proyecto } from "src/proyecto/entities/proyecto.entity";
import { User } from "../../users/entities/user.entity"; // Asumiendo que tienes una entidad Usuario
import { 
  Column, 
  CreateDateColumn, 
  Entity, 
  JoinColumn, 
  ManyToOne, 
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

  @ManyToOne(() => Proyecto) // Relación con Proyecto
  @JoinColumn({ name: 'proyectoId' })
  proyecto: Proyecto;

  @Column()
  creador: string;  // Ahora 'creador' es una cadena que representa el nombre del creador


  @Column({ nullable: true })
  responsable: string | null;

  @Column({ type: 'date', nullable: true })
  fechaInicio: Date | null;

  @Column({ type: 'date', nullable: true })
  fechaTermino: Date | null;

  @Column({ default: 'pendiente' })
  estado: string;

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn()
  fechaActualizacion: Date;
} 
