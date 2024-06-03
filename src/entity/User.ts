import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from "typeorm";
import { Song } from "./Song";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number; // ใช้เครื่องหมาย ! เพื่อบอกว่า property นี้จะไม่เป็น undefined

  @Column()
  name!: string; // ใช้เครื่องหมาย ! เพื่อบอกว่า property นี้จะไม่เป็น undefined

  @Column()
  email!: string; // ใช้เครื่องหมาย ! เพื่อบอกว่า property นี้จะไม่เป็น undefined

  @CreateDateColumn()
  created_at!: Date; // ใช้เครื่องหมาย ! เพื่อบอกว่า property นี้จะไม่เป็น undefined

  @UpdateDateColumn()
  updated_at!: Date; // ใช้เครื่องหมาย ! เพื่อบอกว่า property นี้จะไม่เป็น undefined

  @ManyToMany(() => Song)
  @JoinTable()
  songs!: Song[]; // ใช้เครื่องหมาย ! เพื่อบอกว่า property นี้จะไม่เป็น undefined
}
