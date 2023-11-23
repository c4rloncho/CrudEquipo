import { Proyecto } from "src/proyecto/entities/proyecto.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
export class Tarea {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    nombre: string;
  
    @Column()
    descripcion: string;
  
    @Column({ default: null, nullable: true })
    responsable: string;
  
    @Column({ default: 'pendiente' })
    estado: string;
  
    @Column({ default: null, nullable: true })
    fechaInicio: Date;
  
    @Column({ default: null, nullable: true })
    fechaTermino: Date;
  
    @ManyToOne(() => Proyecto, (proyecto) => proyecto.tareas)
    @JoinColumn()
    proyecto: Proyecto;
  
    @ManyToOne(() => Usuario, (usuario) => usuario.tareasCreadas)
    @JoinColumn()
    creador: Usuario;
  
    @CreateDateColumn()
    fechaCreacion: Date;
  
    @UpdateDateColumn()
    fechaActualizacion: Date;
  }