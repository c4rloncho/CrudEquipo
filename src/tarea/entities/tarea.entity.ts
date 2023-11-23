import { Proyecto } from "src/proyecto/entities/proyecto.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Tarea{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombre:string;
    @Column()
    descripcion:string;
    
    @ManyToOne(() => Proyecto, (Proyecto) => Proyecto.tareas)
    proyecto: Proyecto;

}