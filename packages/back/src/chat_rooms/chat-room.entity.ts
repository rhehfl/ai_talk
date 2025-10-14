import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('chat_room')
@Unique(['userId', 'personaId'])
export class ChatRoom {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'user_id' })
  userId: string;

  // 2. 페르소나 ID (외래 키가 아닌 일반 숫자 컬럼으로만 저장)
  @Column({ name: 'persona_id' })
  personaId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
