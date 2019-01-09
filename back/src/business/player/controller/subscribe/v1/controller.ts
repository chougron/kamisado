import { isNull } from 'util';
import ControllerInterface from '../../../../../technical/controller/controllerInterface';
import { BusinessError } from '../../../../../technical/error/businessError';
import playerRepository from '../../../repository/player';
import { createPlayer } from '../../../service/player';

const subscribeController: ControllerInterface = async (req, res) => {
  const existingPlayer = await playerRepository.getByUsername(req.body.username);

  if (!isNull(existingPlayer)) {
    throw new BusinessError('This username already exist.', 402);
  }

  const player = await createPlayer(req.body.username, req.body.password);

  res.status(201).json(player);
};

export default subscribeController;
