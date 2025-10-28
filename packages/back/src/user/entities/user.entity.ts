// src/user/entities/user.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

export type AuthProvider = 'local' | 'kakao' | 'google';

@Entity()
@Unique(['email', 'provider'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  password?: string;

  @Column()
  nickname: string;

  @Column({
    type: 'enum',
    enum: ['local', 'kakao', 'google'],
    default: 'local',
  })
  provider: AuthProvider;

  @Column({ nullable: true })
  providerId?: string;
}
