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
