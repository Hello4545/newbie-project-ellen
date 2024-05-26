module.exports = {
    apps: [
      {
        name: 'newbie-project-ellen', // 애플리케이션 이름
        script: './src/index.js', // 애플리케이션 진입 파일
        instances: 1, // 실행할 인스턴스 수
        autorestart: true, // 자동 재시작 설정
        watch: false, // 파일 변경 감지 여부
        max_memory_restart: '1G', // 메모리 한계 설정
        env: {
          NODE_ENV: 'development', // 개발 환경 설정
        },
        env_production: {
          NODE_ENV: 'production', // 프로덕션 환경 설정
        },
      },
    ],
  };
  