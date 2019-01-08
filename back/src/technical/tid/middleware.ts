import { RequestHandler } from 'express';
import { v4 as generateUuid } from 'uuid';
import { createTransactionalLogger } from '../logger/index';

const tidMiddleware: RequestHandler = (req, res, next) => {
  req.logger = createTransactionalLogger(generateUuid());
  next();
};

export default tidMiddleware;
