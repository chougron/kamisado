import { Pool } from 'pg';
import config from '../../../config';

const pool = new Pool({
  user: config.postgres.user,
  host: config.postgres.host,
  database: config.postgres.db,
  password: config.postgres.password,
  port: config.postgres.port,
});

export default pool;
