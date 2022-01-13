import { Logger } from 'pino';

/**
 * Helper fn to extract message from error
 * @param error - Error instance or unknown
 * @returns message or coerced error argument
 */
export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

export function handleUncaughtExceptions(log: Logger) {
  process.on('uncaughtException', (err: Error, origin: string) => {
    log.fatal(err, 'uncaughtException', { origin });

    setTimeout(() => {
      process.exit(1);
    }, 500);
  });
}

export function handleUnhandledRejection(log: Logger) {
  process.on('unhandledRejection', (err: Error) => {
    log.fatal(err, 'unhandledRejection');

    setTimeout(() => {
      process.exit(1);
    }, 500);
  });
}
