import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany } from "typeorm";
import { User } from "./User";

@Entity()
export class Song {
  @PrimaryGeneratedColumn()
  id!: number; // ใช้เครื่องหมาย ! เพื่อบอกว่า property นี้จะไม่เป็น undefined

  @Column()
  name!: string; // ใช้เครื่องหมาย ! เพื่อบอกว่า property นี้จะไม่เป็น undefined

  @CreateDateColumn()
  created_at!: Date; // ใช้เครื่องหมาย ! เพื่อบอกว่า property นี้จะไม่เป็น undefined

  @UpdateDateColumn()
  updated_at!: Date; // ใช้เครื่องหมาย ! เพื่อบอกว่า property นี้จะไม่เป็น undefined

  @ManyToMany(() => User, user => user.songs)
  users!: User[]; // ใช้เครื่องหมาย ! เพื่อบอกว่า property นี้จะไม่เป็น undefined
}
