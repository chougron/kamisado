import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import config from '../config';
import authMiddleware from './business/player/middleware/auth';
import playerRouter from './business/player/router';
import statusController from './technical/controller/status';
import controllerErrorHandler from './technical/error/controllerErrorHandler';
import errorHandler from './technical/error/errorRequestMiddleware';
import logger from './technical/logger/index';
import tidMiddleware from './technical/tid/middleware';

const app = express();

// [ MIDDLEWARES ]
// Json parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Cookies
app.use(cookieParser());
// JWT auth
app.use(tidMiddleware);
app.use(authMiddleware.unless({ path: ['/api/status', '/api/v1/player/login'] }));
app.use(express.json());

// [ ROUTES ]
const apiRouter = express.Router();
apiRouter.use(playerRouter);
apiRouter.get('/status', controllerErrorHandler(statusController));

app.use('/api', apiRouter);

// [ ERRORS HANDLING ]
app.use(errorHandler);

const server = app.listen(config.app.port, '0.0.0.0', () => {
  logger.info(`Server listening on port ${config.app.port}`);
});

export { app, server, apiRouter };
