import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthProvider } from '@/user/types/auth-provider.enum';
import { User } from '@/user/user.entity';

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

  create() {
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
    const user = await this.userRepository.findOne({
      where: {
        provider: dto.provider,
        providerId: dto.providerId,
      },
    });

    if (user) {
      user.nickname = dto.nickname;
      return this.userRepository.save(user);
    }

    const newUser = this.userRepository.create({
      email: dto.email,
      nickname: dto.nickname,
      provider: dto.provider,
      providerId: dto.providerId,
    });

    return this.userRepository.save(newUser);
  }
}
