# [1.6.0](https://github.com/rhehfl/doran-doran/compare/v1.5.10...v1.6.0) (2025-11-05)


### Bug Fixes

* create 메서드에서 CreateUserDto 매개변수 제거 ([3463c05](https://github.com/rhehfl/doran-doran/commit/3463c056e204ef23db3ab94af91157ae3abe51d9))
* CreateUserDto 임포트 제거 ([25d474b](https://github.com/rhehfl/doran-doran/commit/25d474b8bd541d752fac7ffc2141d9aab25140d9))
* text 스트리밍 자연스럽게 수정 ([5ffd11f](https://github.com/rhehfl/doran-doran/commit/5ffd11f1876e5bab002f45d803d0cc8c9de613c5))
* 구글 로그인 URL 경로 수정 ([7219168](https://github.com/rhehfl/doran-doran/commit/7219168544cb40592daa26c465f22830fc955f9b))
* 소셜로그인 인증 추가 ([84f06de](https://github.com/rhehfl/doran-doran/commit/84f06de6a6f102f37fb55fe065228283c9a134bb))
* 오류 페이지 링크 클래스 수정 ([cbe9ce4](https://github.com/rhehfl/doran-doran/commit/cbe9ce45e9a4d43e025ef7856bc56ce527a8c8b5))
* 환경별 동적 경로 설정 ([80cb5fb](https://github.com/rhehfl/doran-doran/commit/80cb5fb1ecb890e4f1559e88d3968769d0c39166))


### Features

* @nestjs/passport 및 관련 패키지 추가 ([3acd10b](https://github.com/rhehfl/doran-doran/commit/3acd10ba0d67f92dbc6849cc8c2513b36143a221))
* AILoadingMessage 및 ChatCard 컴포넌트 개선, ChatList에 streamingMessage 추가 ([365724c](https://github.com/rhehfl/doran-doran/commit/365724ceb1dc436b559a86582283e8ffba9c1cd5))
* authguard 추가 ([8eb1406](https://github.com/rhehfl/doran-doran/commit/8eb140688bc865ce8a833e6d9983ecd26c534dc1))
* ChatIcon 및 LoadingSpinner 컴포넌트 삭제, EmptyChatCard 추가 및 ChatRoom에서 사용 ([c18ee97](https://github.com/rhehfl/doran-doran/commit/c18ee97b297254845359372068bcb8706adc61c7))
* useLocalStorage 훅 추가 및 인증 콜백 페이지 구현 ([2c7744d](https://github.com/rhehfl/doran-doran/commit/2c7744dcf62570a83f240f3aa201542507d5e327))
* 구글 로그인 콜백 처리 및 JWT 설정 개선 ([a5fab3f](https://github.com/rhehfl/doran-doran/commit/a5fab3f416be564cb375e12cf590fd8baea23ea7))
* 메시지 저장 오류 처리 및 에러 페이지 추가 ([6ada785](https://github.com/rhehfl/doran-doran/commit/6ada785fc64d87577001c0e8099235a73625f1b6))
* 인증 모듈 및 사용자 모듈 추가, 소셜 로그인 기능 구현 ([af84a5b](https://github.com/rhehfl/doran-doran/commit/af84a5b39020fdce286c79726ee38165f5ed231b))
* 채팅 내역 저장 추가 ([3cade44](https://github.com/rhehfl/doran-doran/commit/3cade44cac4a7a0ecb5730790f3276b24d9fa3bd))
* 채팅 메시지 저장 로직 개선 및 익명 사용자 메시지 제한 추가 ([8803198](https://github.com/rhehfl/doran-doran/commit/8803198fa53cb16bc6d9ddf3e54ca825a5c474ab))
* 쿠키 모듈 및 서비스 추가, 인증 콜백에서 쿠키 설정 로직 통합 ([1214246](https://github.com/rhehfl/doran-doran/commit/121424613d95594441c715ffe30487886fc55e61))
* 쿠키 서비스에서 응답 객체를 사용하여 쿠키 설정 및 삭제 로직 수정 ([fc2aaaf](https://github.com/rhehfl/doran-doran/commit/fc2aaaf1ef8a273e667f74163cfa015a85875ac8))
* 프론트엔드 구글로그인 버튼추가 ([46f27cb](https://github.com/rhehfl/doran-doran/commit/46f27cbbe98d64e20c27c41bf887662fb793946a))

## [1.5.10](https://github.com/rhehfl/ai_talk/compare/v1.5.9...v1.5.10) (2025-10-27)


### Bug Fixes

* personas.json 파일 경로 중복 제거 ([5f77086](https://github.com/rhehfl/ai_talk/commit/5f77086ee3dc8ef42ac2c10713d01d3bc81a70e7))
* WebSocketGateway에 CORS 설정 추가 ([926ce42](https://github.com/rhehfl/ai_talk/commit/926ce4289562335f745e07f18f3fdd29bf280ed3))

## [1.5.9](https://github.com/rhehfl/ai_talk/compare/v1.5.8...v1.5.9) (2025-10-27)


### Bug Fixes

* personas.json 파일 경로를 docker-compose.yml 설정에 맞게 수정 ([9b0a75e](https://github.com/rhehfl/ai_talk/commit/9b0a75efc92e2e4aac3876cfdaa5f36e7680854e))

## [1.5.8](https://github.com/rhehfl/ai_talk/compare/v1.5.7...v1.5.8) (2025-10-27)


### Bug Fixes

* 데이터 소스 설정에서 프로덕션 환경에 따른 시드 및 마이그레이션 경로 수정 ([4ea7392](https://github.com/rhehfl/ai_talk/commit/4ea73925eedd02ce1ad763f4d4e6031bd9d59b1b))
* 코드 정리 및 불필요한 import 문 제거 ([0873a8c](https://github.com/rhehfl/ai_talk/commit/0873a8c6c5f7f500993707b4473dbe687d663e64))

## [1.5.7](https://github.com/rhehfl/ai_talk/compare/v1.5.6...v1.5.7) (2025-10-27)


### Bug Fixes

* Dockerfile에서 PnP 파일 대신 node_modules 디렉터리 복사 ([27fac1d](https://github.com/rhehfl/ai_talk/commit/27fac1d9ee0a7fc71896a11d7bf0081734262aca))

## [1.5.6](https://github.com/rhehfl/ai_talk/compare/v1.5.5...v1.5.6) (2025-10-27)


### Bug Fixes

* Dockerfile에서 PnP 파일 대신 node_modules 디렉터리 복사 ([1225dd2](https://github.com/rhehfl/ai_talk/commit/1225dd2ee2aacbb215acc21cee332e8d835f4eac))
* Dockerfile에서 빌드 단계 및 프로덕션 의존성 복사 방식 수정 ([7907c0b](https://github.com/rhehfl/ai_talk/commit/7907c0b6ecafa001696f1823aa1508358a71065d))

## [1.5.5](https://github.com/rhehfl/ai_talk/compare/v1.5.4...v1.5.5) (2025-10-27)


### Bug Fixes

* 도커파일최적화 ([437d3bf](https://github.com/rhehfl/ai_talk/commit/437d3bf4dd2689bea452f1d192177a38b6940d64))

## [1.5.4](https://github.com/rhehfl/ai_talk/compare/v1.5.3...v1.5.4) (2025-10-27)


### Bug Fixes

* Docker 이미지 빌드 시 no-cache 옵션 추가 ([fee1b57](https://github.com/rhehfl/ai_talk/commit/fee1b57bbd98e7d448e555e93df2e7cc638acb68))

## [1.5.3](https://github.com/rhehfl/ai_talk/compare/v1.5.2...v1.5.3) (2025-10-27)


### Bug Fixes

* dataSource를 const로 변경하고 export 방식을 수정 ([bfda24d](https://github.com/rhehfl/ai_talk/commit/bfda24d1369b714203846cf2187d814da6c64767))

## [1.5.2](https://github.com/rhehfl/ai_talk/compare/v1.5.1...v1.5.2) (2025-10-26)


### Bug Fixes

* ㅁㄴ ([66ed5a0](https://github.com/rhehfl/ai_talk/commit/66ed5a018f5c23df98d24391e3dea843ee0feb58))

## [1.5.1](https://github.com/rhehfl/ai_talk/compare/v1.5.0...v1.5.1) (2025-10-26)


### Bug Fixes

* 'crypto' 모듈 추가 및 ChatRoomLayout에서 modal 제거 ([4c16fce](https://github.com/rhehfl/ai_talk/commit/4c16fce84b896c39c424a6b7b7c3f6f3b7ae82fb))
* seed:run 명령어에 cross-env 추가 ([f24b2db](https://github.com/rhehfl/ai_talk/commit/f24b2db9bed7c05d3cf3787c7287279bb1af7ee7))
* 베이스이미지 변경 ([25836ed](https://github.com/rhehfl/ai_talk/commit/25836eda320622c6d48e037f4e71dfc0615a27ae))

# [1.5.0](https://github.com/rhehfl/ai_talk/compare/v1.4.0...v1.5.0) (2025-10-26)


### Bug Fixes

* 명령어수정 ([2016914](https://github.com/rhehfl/ai_talk/commit/20169146bada1cc615a4cd5d9b0c89e0cfd6f30b))


### Features

* dotenv 및 socket.io 의존성 추가 ([c0d5798](https://github.com/rhehfl/ai_talk/commit/c0d579865e16af694b9ec3ca63f68ff7eabff711))

# [1.4.0](https://github.com/rhehfl/ai_talk/compare/v1.3.0...v1.4.0) (2025-10-26)


### Bug Fixes

* .gitignore에서 docker-compose.yml 항목 수정 ([2d71e7e](https://github.com/rhehfl/ai_talk/commit/2d71e7e601e6947f77bcbf4d698eb748d129d99a))
* postgres연결 수정 ([cba34c7](https://github.com/rhehfl/ai_talk/commit/cba34c714c66c713e771c0aa0158f093d2726f5a))
* VSCode 설정에서 ESLint 및 Prettier 관련 옵션 수정 ([fbc98ae](https://github.com/rhehfl/ai_talk/commit/fbc98ae6f5b6b8a7c24e062d45667c49550c0f63))
* 수정된 경로로 postChatRoom 임포트 ([f7ce6f1](https://github.com/rhehfl/ai_talk/commit/f7ce6f1abb03c6be8207e11d73d88d5147c9933f))
* 채팅 연결 버그 수정 ([a00576c](https://github.com/rhehfl/ai_talk/commit/a00576cb93eeda0d5e35b61d42536df649b56e92))
* 페르소나, 세션발급로직수정 ([032fb28](https://github.com/rhehfl/ai_talk/commit/032fb28d33aff3a0b58b42a69754033b5c759384))


### Features

* add chat type guards and message types ([8995856](https://github.com/rhehfl/ai_talk/commit/899585657b9a1599bdf6c5855e26efec4e41de29))
* AI 기본 응답 추가 ([cf63532](https://github.com/rhehfl/ai_talk/commit/cf63532997165d222bfe8f32d0e784a26f817e9b))
* chatroom페이지 페르소나 결합 ([85bebf8](https://github.com/rhehfl/ai_talk/commit/85bebf8baef8f5a7b0b519b718dccc3f07d08531))
* common패키지 dto추가 ([eb7cd30](https://github.com/rhehfl/ai_talk/commit/eb7cd30168993867c377cacbb3018e65b18d77e9))
* db추가 ([b3b0b6a](https://github.com/rhehfl/ai_talk/commit/b3b0b6aeea52a168673a78b2adc53d9b4ad42cc2))
* Redis 모듈 및 서비스 추가, 페르소나 관리 기능 구현 ([fdeb173](https://github.com/rhehfl/ai_talk/commit/fdeb173c76ea851551755f6e87f4bbb0bffa8151))
* 데이터 seeding 추가 ([9c6b32d](https://github.com/rhehfl/ai_talk/commit/9c6b32d0e19f5fb3ab09c15ed421f8115adadb78))
* 모달 컴포넌트에서 불필요한 주석 제거 및 스타일 수정, 기본 컴포넌트 추가 ([984d63c](https://github.com/rhehfl/ai_talk/commit/984d63cebceeaf4e9dd67a245790370405299aff))
* 백엔드 채팅방 api생성 ([ab6fa7e](https://github.com/rhehfl/ai_talk/commit/ab6fa7e6195e064b1df8ce5eeca04331420f650a))
* 세션 관리 기능 추가 및 관련 컴포넌트 및 훅 구현 ([9e6dc54](https://github.com/rhehfl/ai_talk/commit/9e6dc5469045218529924063ce0e2adafb87cc06))
* 채팅 기능 개선 및 새로운 API 추가 ([3008239](https://github.com/rhehfl/ai_talk/commit/3008239eeb7e52cbc369be3febe6e5f12953d446))
* 채팅 기능 추가 및 관련 모듈, 서비스, 컨트롤러 구현 ([17df8ad](https://github.com/rhehfl/ai_talk/commit/17df8ad394d3a82d2250ee4da0889e1ce4d6dca8))
* 채팅 및 페르소나 관련 API 추가 및 기존 API 정리 ([fa89d76](https://github.com/rhehfl/ai_talk/commit/fa89d76e21a50d5f3d4f96477f7eafd358158e07))
* 채팅 스트림 추가 ([3db2ca3](https://github.com/rhehfl/ai_talk/commit/3db2ca3a0b4666dc6e227f7afe5908a0dd49e3b5))
* 채팅모듈생성 ([a2ad022](https://github.com/rhehfl/ai_talk/commit/a2ad0220847dcd93b01a02d2d032eb461872bfe4))
* 채팅방 접근 권한 처리 및 에러 핸들링 개선 ([884b6e6](https://github.com/rhehfl/ai_talk/commit/884b6e697e9251b837546cf3b33041bc2ddc46ed))
* 채팅방 정보 및 히스토리 가져오기 기능 추가, React Query Devtools 통합 ([01deb4b](https://github.com/rhehfl/ai_talk/commit/01deb4bbbe3316bd9b4efcb8cf3dd1661936e8b6))
* 테마 변경 추가 ([1e9419a](https://github.com/rhehfl/ai_talk/commit/1e9419a468234072e4005cd8f80c28a92c688376))
* 페르소나 선택 기능 추가 및 레이아웃 개선 ([e1e3a81](https://github.com/rhehfl/ai_talk/commit/e1e3a81ddcb0064241e97bbe52e6131e6dc065e1))
* 페르소나 엔티티 및 관련 서비스, 컨트롤러, 레포지토리 추가 ([539bffe](https://github.com/rhehfl/ai_talk/commit/539bffe815b946f79919e66bfb667d2dc3c177f9))
* 페르소나 페이지에 뒤로가기 버튼 추가 및 레이아웃 수정 ([2878b90](https://github.com/rhehfl/ai_talk/commit/2878b9043b56ed709efa12049d8e6d4dba146357))
* 페이지 전환효과 추가 ([8906cf3](https://github.com/rhehfl/ai_talk/commit/8906cf3688c3e6f9d0a0b990cfbae81339e47161))

# [1.3.0](https://github.com/rhehfl/ai_talk/compare/v1.2.0...v1.3.0) (2025-10-08)


### Features

* 구글 애널리틱스 스크립트 추가 ([dd3e1f2](https://github.com/rhehfl/ai_talk/commit/dd3e1f2964193eff3741cbdc31197217a361c6cc))

# [1.2.0](https://github.com/rhehfl/ai_talk/compare/v1.1.0...v1.2.0) (2025-10-08)


### Features

* 로봇 메타데이터 규칙 추가 및 사이트맵 반환 ([5ec7645](https://github.com/rhehfl/ai_talk/commit/5ec7645aebe396887107d7f8430282b60a686436))

# [1.1.0](https://github.com/rhehfl/ai_talk/compare/v1.0.9...v1.1.0) (2025-10-08)


### Bug Fixes

* 히스토리 로직 분리 ([9e52749](https://github.com/rhehfl/ai_talk/commit/9e5274926642c758ecd2205247c8199046b8e318))


### Features

* 검색등록 ([591d833](https://github.com/rhehfl/ai_talk/commit/591d8337eab820667e8c255d733658d979aae6bd))
* 메타 데이터 추가 ([f4a65e5](https://github.com/rhehfl/ai_talk/commit/f4a65e5f5a9f225aeaeaa8392caa8870c7ab2d58))
* 채팅방 기능 개선 및 새로운 API 추가 ([56098ee](https://github.com/rhehfl/ai_talk/commit/56098eead6d0eb87fc2ff22f540b05f37be5ed38))

## [1.0.9](https://github.com/rhehfl/ai_talk/compare/v1.0.8...v1.0.9) (2025-10-06)


### Bug Fixes

* 랜딩페이지 수정 ([4ca784b](https://github.com/rhehfl/ai_talk/commit/4ca784bbeb906b0e317d70ff7465bde08193c66c))
* 메인 화면 레이아웃 개선 및 배경 그라데이션 추가 ([831abc8](https://github.com/rhehfl/ai_talk/commit/831abc88223e53a2e4f54c94df706ffa6500b9d8))
* 백엔드 에러핸들링 수정 ([481cc0a](https://github.com/rhehfl/ai_talk/commit/481cc0a1726b1261fdf219d7cd8d93dea6332660))
* 불필요한 캐시된 personaId 가져오기 제거 ([520497a](https://github.com/rhehfl/ai_talk/commit/520497a60458f75f0190f2ccbff94a4b8ddff0b1))
* 불필요한 쿠키 파서 임포트 제거 ([26b1df3](https://github.com/rhehfl/ai_talk/commit/26b1df342539fc749cb97dadb2107f98b9fc9f8f))
* 세션발급로직 수정 ([c8dc75e](https://github.com/rhehfl/ai_talk/commit/c8dc75ef6dc5c1fcee6be4a748ce1007b551a666))
* 제미나이 key 제거 ([a60b27c](https://github.com/rhehfl/ai_talk/commit/a60b27c5c4f57f719b32fd22e6ccf61bf30a2ab9))
* 쿠키 유틸함수 작성 ([0911e55](https://github.com/rhehfl/ai_talk/commit/0911e5599fb2f745e3e5567a961aa02a470fa5a1))

## [1.0.8](https://github.com/rhehfl/ai_talk/compare/v1.0.7...v1.0.8) (2025-10-01)


### Bug Fixes

* 세션 쿠키 이름을 'sessionId'에서 'chat_session_id'로 변경 ([6af7334](https://github.com/rhehfl/ai_talk/commit/6af7334b5267eb3accd0fa21e21670b4b01c772b))

## [1.0.7](https://github.com/rhehfl/ai_talk/compare/v1.0.6...v1.0.7) (2025-10-01)


### Bug Fixes

* CORS 설정에 www 도메인 추가 ([c63d31d](https://github.com/rhehfl/ai_talk/commit/c63d31dfcdf6f2e90461e688e94de6b68354f3eb))

## [1.0.6](https://github.com/rhehfl/ai_talk/compare/v1.0.5...v1.0.6) (2025-10-01)


### Bug Fixes

* "use client" 지시문 추가 ([a94657c](https://github.com/rhehfl/ai_talk/commit/a94657c6fc1b95612eac5ba7122140170eee0038))

## [1.0.5](https://github.com/rhehfl/ai_talk/compare/v1.0.4...v1.0.5) (2025-10-01)


### Bug Fixes

* 세션 생성 시 쿠키 설정 및 도메인 추가 ([30c29f9](https://github.com/rhehfl/ai_talk/commit/30c29f9d6634e38bb5d9b7b8aca33675dc1ec354))

## [1.0.4](https://github.com/rhehfl/ai_talk/compare/v1.0.3...v1.0.4) (2025-10-01)


### Bug Fixes

* 세션 생성 시 쿠키 설정 및 응답 메시지 수정 ([0abcf61](https://github.com/rhehfl/ai_talk/commit/0abcf61fbff7024920c0e6f489de7657c204daf3))

## [1.0.3](https://github.com/rhehfl/ai_talk/compare/v1.0.2...v1.0.3) (2025-10-01)


### Bug Fixes

* 최신 릴리즈 태그 가져오기 기능 추가 및 태그 사용 수정 ([56618c9](https://github.com/rhehfl/ai_talk/commit/56618c95390f8095ad27b7153dede7e1fd8301ec))

## [1.0.2](https://github.com/rhehfl/ai_talk/compare/v1.0.1...v1.0.2) (2025-10-01)


### Bug Fixes

* 배포조건수정 ([02bf662](https://github.com/rhehfl/ai_talk/commit/02bf662b994d66fc07449edc8eeda6625cf470dd))

## [1.0.1](https://github.com/rhehfl/ai_talk/compare/v1.0.0...v1.0.1) (2025-10-01)


### Bug Fixes

* 릴리즈 수정 ([7e9fb00](https://github.com/rhehfl/ai_talk/commit/7e9fb000131f0342c2476098994b6b75cea96ac3))

# 1.0.0 (2025-10-01)


### Bug Fixes

* lint 에러 제거 ([e233b07](https://github.com/rhehfl/ai_talk/commit/e233b0703d8c9e8e9cc7d44ca8ef6991a49f6da1))


### Features

* setup페이지 추가 ([5c323b1](https://github.com/rhehfl/ai_talk/commit/5c323b167479b6fdba3fdb3f81078bfc937d1db4))
* test ([ce37f05](https://github.com/rhehfl/ai_talk/commit/ce37f05309ae279ae938b0bb01b47dd197bacdd6))
* 프로젝트기본세팅 ([3e21a89](https://github.com/rhehfl/ai_talk/commit/3e21a89864d28fe7aafd099361558a3a68a4275c))
