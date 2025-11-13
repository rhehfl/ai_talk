import { GithubService } from '@/github/github.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [GithubService],
  exports: [GithubService],
})
export class GithubModule {}
