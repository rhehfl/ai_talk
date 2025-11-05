import { ChatRoom } from '@/chat_rooms/chat-room.entity';
import { AuthProvider } from '@/user/types/auth-provider.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from 'typeorm';

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

  @OneToMany(() => ChatRoom, (chatRoom) => chatRoom.user)
  chatRooms: ChatRoom[];
}
