import axios from 'axios';

export class GithubService {
  constructor() {}
  private async handleGetRepoTree(
    args: { repositoryName: string },
    owner: string, // 'token' 대신 'owner'를 받음
    token: string, // 토큰은 API 인증을 위해 여전히 필요
  ) {
    try {
      const repoInfo = await axios.get(
        `https://api.github.com/repos/${owner}/${args.repositoryName}`,
        {
          headers: { Authorization: `Bearer ${token}` }, // 인증용 토큰
        },
      );
      console.log(repoInfo.data);
      // ... (이하 동일) ...
    } catch (error) {
      // ...
    }
  }
}
