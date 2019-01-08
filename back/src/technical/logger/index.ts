import winston, { format } from 'winston';
import createTidFormatter from './formatter/tid';

const { combine, simple, timestamp } = format;

const createTransactionalLogger = (transactionId: string) => {
  const transactionalLogger = winston.createLogger({
    transports: [new winston.transports.Console()],
    format: combine(timestamp(), createTidFormatter(transactionId), simple()),
  });

  return transactionalLogger;
};

const systemLogger = winston.createLogger({
  transports: [new winston.transports.Console()],
  format: combine(timestamp(), simple()),
});

export default systemLogger;
export { createTransactionalLogger };
