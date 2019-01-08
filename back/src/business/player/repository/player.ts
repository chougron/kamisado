import { Player } from 'kamisado-common/dist/business/player/type';
import { Pool } from 'pg';
import currentPool from '../../../technical/db';

interface PlayerRow {
  id: number;
  username: string;
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

  public async getAll() {
    const query = 'SELECT * FROM "player";';

    return this.fetchAll(query, []);
  }

  private playerFromRow(row: PlayerRow): Player {
    const player: Player = {
      id: row.id,
      username: row.username,
    };

    return player;
  }

  /**
   * @param query
   * @param values Array of values of any type bound to the query
   */
  private async fetchOne(query: string, values: any[]): Promise<Player | null> {
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
  private async fetchAll(query: string, values: any[]): Promise<Player[]> {
    const { rows } = await this.pool.query(query, values);

    return rows.map((row: PlayerRow) => this.playerFromRow(row));
  }
}

export default new DoctorRepository(currentPool);