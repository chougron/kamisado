import { ErrorRequestHandler } from 'express';
import { BusinessError } from './businessError';

/**
 * @param err Object passed in case of promise error. Can be of any type
 * @param req
 * @param res
 * @param next
 */
const handler: ErrorRequestHandler = (err: Error | BusinessError, req, res, next) => {
  let code: number = 500;
  let shownMessage: string = 'Une erreur est survenue.';

  if (err instanceof BusinessError) {
    code = err.httpCode;
    shownMessage = err.message;
    req.logger.warn(err);
  } else if (err instanceof Error) {
    req.logger.error(err);
    // If UnauthorizedError, launch a 401
    if (err.name === 'UnauthorizedError') {
      code = 401;
      shownMessage = 'Vous devez être authentifié pour accéder à cette ressource.';
    }
  } else {
    req.logger.error(err);
  }

  res.status(code).json({
    error: shownMessage,
  });
};

export default handler;
