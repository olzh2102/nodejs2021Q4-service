import { FastifyInstance, FastifyRequest } from 'fastify';

const createLogger = (server: FastifyInstance) => {
  const now = () => Date.now();

  server.addHook('onRequest', (req: FastifyRequest<any>, reply: any, done) => {
    // eslint-disable-next-line no-param-reassign
    (reply as any).startTime = now();
    req.body.info({
      url: req.raw.url,
      id: req.id,
    });
    done();
  });
};

export default createLogger;
