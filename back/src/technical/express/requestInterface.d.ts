import winston from 'winston';

declare global {
  namespace Express {
    export interface Request {
      logger: winston.Logger;
    }
  }
}
