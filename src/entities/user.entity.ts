import { getRounds, hashSync } from 'bcryptjs';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm';
import { Schedule } from './schedules.entity';

@Entity('users')
class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 45 })
    name: string;

    @Column({ type: 'varchar', length: 45, unique: true })
    email: string;

    @Column({ default: false })
    admin: boolean;

    @Column({ type: 'varchar', length: 120 })
    password: string;

    @CreateDateColumn({ type: 'date' })
    createdAt: string;

    @UpdateDateColumn({ type: 'date' })
    updatedAt: string;

    @DeleteDateColumn({ type: 'date' })
    deletedAt: string;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        const isEncrypted = getRounds(this.password);
        if (!isEncrypted) {
            this.password = hashSync(this.password, 10);
        }
    }

    @OneToMany(() => Schedule, schedules => schedules.user)
    schedule: Schedule[]
}

export { User };