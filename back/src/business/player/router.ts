import express from 'express';
import { loginValidation } from 'kamisado-common/dist/business/doctor/validation';
import controllerErrorHandler from '../../technical/error/controllerErrorHandler';
import { validateRequest } from '../../technical/validation/middleware';
import loginController from './controller/login/v1/controller';

const playerRouter = express.Router();

playerRouter.route('/v1/player/login').post(validateRequest(loginValidation), controllerErrorHandler(loginController));

export default playerRouter;
