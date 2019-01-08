import pool from '../db';
import ControllerInterface from './controllerInterface';

interface TestDbQuery {
  one: number;
}

const statusController: ControllerInterface = async (req, res) => {
  const row: TestDbQuery = (await pool.query('select 1 as one;')).rows[0];
  if (!row.one) {
    throw new Error('Postgres not initialized');
  }

  req.logger.info('Status check OK');
  res.json(row.one);
};

export default statusController;
