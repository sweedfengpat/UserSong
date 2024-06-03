import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Users } from './User';

@Entity()
export class Songs {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    @ManyToMany(() => Users, user => user.songs)
    users: Users[];
}
