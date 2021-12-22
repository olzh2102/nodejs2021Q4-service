import createLogger from 'pino';

const logger = createLogger({
  transport: {
    target: 'pino-pretty',
    options: {
      translateTime: 'SYS: dd-mm-yyyy HH:MM:ss',
      ignore: 'pid,hostname',
    },
  },
});

export default logger;
