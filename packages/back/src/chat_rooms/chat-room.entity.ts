import { Personas } from '@/personas/personas.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  ManyToOne,
  JoinColumn,
  RelationId,
} from 'typeorm';

@Entity('chat_room')
@Unique(['userId', 'personaId'])
export class ChatRoom {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => Personas, (personas) => personas.chatRooms)
  @JoinColumn({ name: 'persona_id' })
  persona: Personas;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @RelationId((chatRoom: ChatRoom) => chatRoom.persona, 'personaId')
  @Column({ name: 'persona_id' })
  personaId: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
