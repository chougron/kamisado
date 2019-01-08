import { isNull } from 'util';
import ControllerInterface from '../../../../../technical/controller/controllerInterface';
import { BusinessError } from '../../../../../technical/error/businessError';
import playerRepository from '../../../repository/player';
import { createTokenForPlayer, setAuthCookie } from '../../../service/jwt';

const loginController: ControllerInterface = async (req, res) => {
  const player = await playerRepository.getByUsername(req.body.username);

  if (isNull(player)) {
    throw new BusinessError('This player does not exist.', 401);
  }

  const token = createTokenForPlayer(player.id);
  setAuthCookie(res, token);

  res.status(204).json(null);
};

export default loginController;
