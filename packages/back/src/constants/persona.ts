import { Persona } from 'common';
import * as fs from 'fs';
import * as path from 'path';

const loadPersonasFromFile = (): Persona[] => {
  const env = process.env.NODE_ENV;
  const file =
    env === 'dev'
      ? '../../../configs/prompt/personas.json'
      : '../prompt/personas.json';

  try {
    const filePath = path.resolve(__dirname, file);

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const personas: Persona[] = JSON.parse(fileContent);

    console.info('✅ 페르소나 상수 데이터 로딩 성공!');
    return personas;
  } catch (error) {
    console.error('❌ 페르소나 상수 데이터를 불러오는 데 실패했습니다:', error);
    process.exit(1);
  }
};

export const PERSONAS: Persona[] = loadPersonasFromFile();
