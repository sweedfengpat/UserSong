import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Songs } from './Song';

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    @ManyToMany(() => Songs, song => song.users)
    @JoinTable()
    songs: Songs[];
}
