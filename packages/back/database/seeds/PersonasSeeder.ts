import { Personas } from '@/personas/personas.entity';
import { Persona } from 'common';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import * as path from 'path';
import * as fs from 'fs';

const loadPersonasFromFile = (): Persona[] => {
  try {
    const isProduction = process.env.NODE_ENV === 'production';

    let filePath = '';

    if (isProduction) {
      filePath = path.resolve('dist/configs/prompt/personas.json');
    } else {
      filePath = path.resolve('configs/prompt/personas.json');
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const personas: Persona[] = JSON.parse(fileContent);

    console.info('✅ 페르소나 상수 데이터 로딩 성공!');
    return personas;
  } catch (error) {
    console.error('❌ 페르소나 상수 데이터를 불러오는 데 실패했습니다:', error);
    process.exit(1);
  }
};

export default class PersonasSeeder implements Seeder {
  public async run(dataSource: DataSource) {
    const repository = dataSource.getRepository(Personas);
    const initialPersonas = loadPersonasFromFile();

    for (const data of initialPersonas) {
      const existingPersona = await repository.findOneBy({ id: data.id });
      if (!existingPersona) {
        // .save() 대신 .insert()를 사용하면 한 번의 쿼리로 여러 데이터를 효율적으로 삽입할 수 있습니다.
        await repository.insert(data);
      }
    }

    // 이 예시에서는 .insert() 대신 .save()를 사용해도 무방합니다.
    // await repository.save(initialPersonas);
  }
}
