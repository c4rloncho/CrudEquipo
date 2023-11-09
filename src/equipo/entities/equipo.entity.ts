import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Equipo {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true, name: 'nombre', type: 'varchar', length: 255 })
  nombre: string;

  @ManyToMany(() => User,(user) => user.equipos)
  users: User[]
}
