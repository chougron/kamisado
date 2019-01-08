import { format } from 'winston';

const createTidFormatter = (transactionUniqueId: string) => {
  const tidFormatter = format(info => {
    if (!transactionUniqueId) {
      return info;
    }

    info.tid = transactionUniqueId;
    return info;
  });

  return tidFormatter();
};

export default createTidFormatter;
