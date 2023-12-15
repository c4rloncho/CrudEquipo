import { Tarea } from "src/tarea/entities/tarea.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comentario {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    contenido: string;

    @ManyToOne(() => Tarea, tarea => tarea.comentarios)
    @JoinColumn({ name: 'tareaId' })
    tarea: Tarea;
}   
