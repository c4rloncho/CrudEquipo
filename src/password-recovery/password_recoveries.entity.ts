import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity({ name: 'password_recoveries' })
export class PasswordRecovery {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    token: string;

    @Column({ default: false })
    used: boolean;

    @ManyToOne(() => User, user => user.passwordRecoveries)
    user: User;
    code: any;
    expiresAt: Date;
}
