import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
    
}
