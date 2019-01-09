import express from 'express';
import { loginValidation, subscribeValidation } from 'kamisado-common/dist/business/player/validation';
import controllerErrorHandler from '../../technical/error/controllerErrorHandler';
import { validateRequest } from '../../technical/validation/middleware';
import loginController from './controller/login/v1/controller';
import subscribeController from './controller/subscribe/v1/controller';

const playerRouter = express.Router();

playerRouter.route('/v1/player/login').post(validateRequest(loginValidation), controllerErrorHandler(loginController));
playerRouter
  .route('/v1/player/subscribe')
  .post(validateRequest(subscribeValidation), controllerErrorHandler(subscribeController));

export default playerRouter;
