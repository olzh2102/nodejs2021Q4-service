import pino, { Level } from 'pino';

import { LOG_LEVELS } from '../common/config';

const transport = pino.transport({
  targets: [
    {
      level: LOG_LEVELS[1] as Level,
      target: 'pino-pretty',
      options: {
        destination: './logs/error.log',
        mkdir: true,
        translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
        ignore: 'pid,hostname',
      },
    },
    {
      level: LOG_LEVELS[5] as Level,
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
