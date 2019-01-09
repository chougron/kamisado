import { ApiPlayer } from 'kamisado-common/dist/business/player/type';
import { Pool } from 'pg';
import currentPool from '../../../technical/db';

interface PlayerRow {
  id: number;
  username: string;
  password: string;
}

class DoctorRepository {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  public async get(id: string) {
    const query = 'select * from "player" where id = $1 limit 1';

    return this.fetchOne(query, [id]);
  }

  public async getByUsername(rpps: string) {
    const query = 'select * from "player" where username = $1 limit 1';

    return this.fetchOne(query, [rpps]);
  }

  public async create(player: ApiPlayer) {
    const query = 'INSERT INTO "player" (username, password) VALUES ($1, $2) RETURNING *';

    return this.fetchOne(query, [player.username, player.password]);
  }

  public async getAll() {
    const query = 'SELECT * FROM "player";';

    return this.fetchAll(query, []);
  }

  private playerFromRow(row: PlayerRow): ApiPlayer {
    const player: ApiPlayer = {
      id: row.id,
      username: row.username,
      password: row.password,
    };

    return player;
  }

  /**
   * @param query
   * @param values Array of values of any type bound to the query
   */
  private async fetchOne(query: string, values: any[]): Promise<ApiPlayer | null> {
    const { rows } = await this.pool.query(query, values);

    if (rows.length === 0) {
      return null;
    }

    return this.playerFromRow(rows[0]);
  }

  /**
   * @param query
   * @param values Array of values of any type bound to the query
   */
  private async fetchAll(query: string, values: any[]): Promise<ApiPlayer[]> {
    const { rows } = await this.pool.query(query, values);

    return rows.map((row: PlayerRow) => this.playerFromRow(row));
  }
}

export default new DoctorRepository(currentPool);
