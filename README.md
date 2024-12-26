# OFFICE_F

## 소개
OFFICE_F는 React와 TypeScript를 기반으로 한 관리자 웹 애플리케이션입니다. Vite를 사용하여 빠른 개발 환경을 제공합니다.

## 주요 기능
- 회원/권한 관리
- 블로그 콘텐츠 관리 (주제, 시리즈, 게시글)
- 챗봇 관리
- 채팅방 관리 및 메시지 로그 확인

## 기술 스택
### Frontend
- React 18.3
- TypeScript
- Vite
- TanStack
  - React Query
  - React Router
  - React Table
- Tailwind CSS
- Shadcn/ui
- Zod (스키마 검증)
- Zustand (상태 관리)

### 개발 도구
- Biome (코드 포맷팅)
- ESLint
- Prettier

## 시작하기

### 필수 조건
- Node.js 20.x 이상
- pnpm 9.11.0 이상

### 설치
```bash
# 패키지 설치
pnpm install
```

### 환경 설정
`.env` 파일을 프로젝트 루트에 생성하고 다음 변수를 설정하세요:
```
VITE_API_URL=your_api_url
```

### 개발 서버 실행
```bash
pnpm dev
```

### 프로덕션 빌드
```bash
pnpm build
```

## 프로젝트 구조
```
src/
├── components/
│   ├── custom-ui/     # 커스텀 UI 컴포넌트
│   ├── guest/         # 비로그인 사용자용 컴포넌트
│   └── ui/            # 기본 UI 컴포넌트
├── lib/
│   ├── api/          # API 관련 함수
│   ├── const/        # 상수
│   └── schema/       # Zod 스키마
├── routes/           # 라우트 정의
└── App.tsx           # 앱 진입점
```

## 배포
GitHub Actions를 통해 자동 배포가 구성되어 있습니다. main 브랜치에 push하거나 PR이 머지되면 자동으로 배포가 진행됩니다.


```1:51:.github/workflows/deploy.yml
name: Deploy to Server

on:
  push:
    branches:
      - main
  pull_request:
    types: [closed]
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - name: 체크아웃
      uses: actions/checkout@v3

    - name: 환경 파일 만들기
      run: |
        echo "VITE_API_URL=${{ secrets.VITE_API_URL }}" > .env

    - name: 프로젝트 빌드
      run: |
        curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
        sudo apt-get install -y nodejs
        corepack enable
        corepack prepare pnpm@latest --activate
        pnpm install
        pnpm run build
    
    - name: scp 전송
      uses: appleboy/scp-action@v0.1.7
      with:
        host: ${{ secrets.SSH_IP }}
        username: ${{ secrets.SSH_USER }}
        port: ${{ secrets.SSH_PORT }}
        key: ${{ secrets.SSH_PRIVATE_KEY }}
        source: dist/ 
        target: /var/www/html/temp_build/

    - name: script 실행
      uses: appleboy/ssh-action@v0.1.6
      with:
        host: ${{ secrets.SSH_IP }}
        username: ${{ secrets.SSH_USER }}
        port: ${{ secrets.SSH_PORT }}
        key: ${{ secrets.SSH_PRIVATE_KEY }}
        script: |
          zsh /scripts/office/build_push.sh
```


## 라이선스
이 프로젝트는 비공개로 운영됩니다.

## 기여 방법
1. 이 저장소를 포크합니다
2. 새로운 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add some amazing feature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

## 문의
프로젝트 관련 문의사항은 이슈를 통해 남겨주시기 바랍니다.
