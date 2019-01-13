module.exports = {
  apps: [
    {
      name: "Common tsc",
      script: "yarn",
      args: "build.watch",
      cwd: "./common",
      interpreter: "node@10.14.2",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G"
    },
    {
      name: "Game server tsc",
      script: "yarn",
      args: "build.watch",
      cwd: "./game-server",
      interpreter: "node@10.14.2",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G"
    },
    {
      name: "Game server",
      script: "dist/server/server.js",
      cwd: "./game-server",
      instances: 1,
      autorestart: true,
      watch: ["dist"],
      node_args: ["--inspect", "--inspect-port=9333"],
      max_memory_restart: "1G",
      interpreter: "node@10.14.2",
      env: {
        WS_PORT: "8999"
      }
    },
    {
      name: "API tsc",
      script: "yarn",
      args: "build.watch",
      cwd: "./back",
      interpreter: "node@10.14.2",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G"
    },
    {
      name: "API",
      script: "dist/src/server.js",
      cwd: "./back",
      instances: 1,
      autorestart: true,
      watch: ["dist"],
      node_args: ["--inspect"],
      max_memory_restart: "1G",
      interpreter: "node@10.14.2",
      env: {
        POSTGRES_HOST: "localhost",
        POSTGRES_PORT: "5432",
        POSTGRES_PASSWORD: "kamisado",
        POSTGRES_USER: "kamisado",
        POSTGRES_DB: "kamisado",
        JWT_SECRET: "my_secret",
        APP_PORT: "3000"
      }
    },
    {
      name: "Front",
      script: "yarn",
      args: "start",
      cwd: "./front",
      instances: 1,
      interpreter: "node@10.14.2",
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        API_URL: "http://0.0.0.0:3000"
      }
    },
    {
      name: "Database",
      script: "scripts/start_db.sh",
      instances: 1,
      autorestart: true,
      watch: false,
      exec_interpreter: "bash",
      exec_mode: "fork_mode",
      max_memory_restart: "1G",
      env: {
        POSTGRES_PORT: "5432",
        POSTGRES_PASSWORD: "kamisado",
        POSTGRES_USER: "kamisado",
        POSTGRES_DB: "kamisado"
      }
    }
  ],
  deploy: {}
};
