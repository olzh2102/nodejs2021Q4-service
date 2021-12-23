import pino from 'pino';

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      destination: './logger.log',
      translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
      ignore: 'pid,hostname',
    },
  },
});

export default logger;
