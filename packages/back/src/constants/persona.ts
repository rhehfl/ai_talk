import { Persona } from "common";
import * as fs from "fs";
import * as path from "path";

/**
 * JSON 파일에서 페르소나 데이터를 동기적으로 읽어와 상수로 반환하는 함수.
 * 이 코드는 애플리케이션이 시작되고 이 모듈을 처음 import할 때 단 한 번만 실행됩니다.
 */
const loadPersonasFromFile = (): Persona[] => {
  try {
    // docker-compose.yml에 설정한 컨테이너 내부 경로를 가리킵니다.
    const filePath = path.resolve(__dirname, "../prompt/personas.json");

    const fileContent = fs.readFileSync(filePath, "utf-8");
    const personas: Persona[] = JSON.parse(fileContent);

    console.info("✅ 페르소나 상수 데이터 로딩 성공!");
    return personas;
  } catch (error) {
    console.error("❌ 페르소나 상수 데이터를 불러오는 데 실패했습니다:", error);
    process.exit(1);
  }
};

export const PERSONAS: Persona[] = loadPersonasFromFile();
