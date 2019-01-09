import { ApiPlayer, Player } from 'kamisado-common/dist/business/player/type';
import { isNull } from 'util';
import { BusinessError } from '../../../technical/error/businessError';
import playerRepository from '../repository/player';
import { hashPassword } from './auth';

export async function createPlayer(username: string, password: string): Promise<Player> {
  const hash = await hashPassword(password);

  const player: ApiPlayer = {
    username,
    password: hash,
    id: null,
  };

  const createdPlayer = await playerRepository.create(player);

  if (isNull(createdPlayer)) {
    throw new BusinessError('Error while saving the new player.');
  }

  return { id: createdPlayer.id, username: createdPlayer.username };
}
