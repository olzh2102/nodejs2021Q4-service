import pino from 'pino';

const transport = pino.transport({
  targets: [
    {
      level: 'error',
      target: 'pino-pretty',
      options: {
        destination: './logs/error.log',
        mkdir: true,
        translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
        ignore: 'pid,hostname',
      },
    },
    {
      level: 'trace',
      target: 'pino-pretty',
      options: {
        destination: './logs/all.log',
        mkdir: true,
        translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
        ignore: 'pid,hostname',
      },
    },
  ],
});

const logger = pino(transport);
export default logger;
