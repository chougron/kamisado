import fs from 'fs';
import config from '../config';

const migrationsDir = fs.realpathSync(
  `${__dirname}/../src/technical/db/migration`,
);

console.log(
  JSON.stringify({
    type: 'postgres',
    host: config.postgres.host,
    port: config.postgres.port,
    username: config.postgres.user,
    password: config.postgres.password,
    database: config.postgres.db,
    migrations: [`${migrationsDir}/*.ts`],
    cli: {
      migrationsDir,
    },
  }),
);
