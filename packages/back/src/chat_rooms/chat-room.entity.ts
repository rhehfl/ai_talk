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

  // 2. 외래 키 설정: ManyToOne 관계
  // ChatRoom (N) : Persona (1) -> 하나의 페르소나에 여러 개의 채팅방이 연결됨
  @ManyToOne(() => Personas, (personas) => personas.chatRooms) // (Optional) Persona 엔티티에 역관계 필드(chatRooms)가 있다고 가정
  @JoinColumn({ name: 'persona_id' }) // 실제 DB 컬럼 이름은 'persona_id'로 지정
  persona: Personas; // 관계 객체 (코드에서 사용)

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @RelationId((chatRoom: ChatRoom) => chatRoom.persona, 'personaId') // "persona" 관계의 ID를 이 필드에 로드하도록 지정
  @Column({ name: 'persona_id' }) // 실제 DB의 컬럼 이름과 동일하게 맞춰줍니다.
  personaId: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
