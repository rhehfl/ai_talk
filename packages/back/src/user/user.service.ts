import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthProvider, User } from '@/user/entities/user.entity';
import { Repository } from 'typeorm';

interface SocialLoginDto {
  provider: AuthProvider;
  providerId: string;
  email: string;
  nickname: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.userRepository.delete(id);
  }

  async findOneById(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`ID가 ${id}인 사용자를 찾을 수 없습니다.`);
    }
    return user;
  }
  async findOrCreateSocialUser(dto: SocialLoginDto): Promise<User> {
    // 1. provider와 providerId로 기존 유저가 있는지 확인
    let user = await this.userRepository.findOne({
      where: {
        provider: dto.provider,
        providerId: dto.providerId,
      },
    });

    if (user) {
      // 2. 이미 가입된 유저면: 닉네임 등 최신 정보로 업데이트하고 반환 (로그인)
      user.nickname = dto.nickname;
      // (필요시 이메일 등 다른 정보도 업데이트)
      return this.userRepository.save(user);
    }

    // 3. 가입되지 않은 유저면: 새로 생성 (회원가입)
    // (이전에 설정한 @Unique(['email', 'provider']) 제약 조건이
    // 동일한 이메일+provider 조합의 중복 가입을 DB 레벨에서 막아줍니다.)
    const newUser = this.userRepository.create({
      email: dto.email,
      nickname: dto.nickname,
      provider: dto.provider,
      providerId: dto.providerId,
      // 소셜 로그인이므로 password는 없음
    });

    // 4. 새 유저를 DB에 저장하고 반환
    return this.userRepository.save(newUser);
  }
}
