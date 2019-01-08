import { RequestHandler } from 'express';
import ControllerInterface from '../controller/controllerInterface';

const controllerErrorHandler = (controller: ControllerInterface) => {
  const requestHandler: RequestHandler = async (req, res, next) => {
    try {
      await controller(req, res);
    } catch (error) {
      next(error);
    }
  };

  return requestHandler;
};

export default controllerErrorHandler;
