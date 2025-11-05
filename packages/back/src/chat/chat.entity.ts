import { ChatRoom } from '@/chat_rooms/chat-room.entity';
import { Personas } from '@/personas/personas.entity';
import { Message } from 'common';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('chats')
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roomId: number;
  @ManyToOne(() => ChatRoom, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'roomId' })
  room: ChatRoom;

  @Column({ type: 'varchar' })
  userId: string;

  @Column({ nullable: true })
  personaId: number;
  @ManyToOne(() => Personas, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'personaId' })
  persona: Personas;

  @Column({ type: 'varchar' })
  author: Message['author'];

  @Column('text')
  content: string;

  @CreateDateColumn()
  createdAt: Date;
}
