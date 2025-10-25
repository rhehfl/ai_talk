import { ChatRoom } from '@/chat_rooms/chat-room.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('personas')
export class Personas {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column('text')
  prompt: string;
  @OneToMany(() => ChatRoom, (chatRoom) => chatRoom.persona)
  chatRooms: ChatRoom[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
