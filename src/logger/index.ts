import { FastifyRequest, FastifyReply } from 'fastify';

const logger = {
  prettyPrint: true,
  serializers: {
    res(reply: FastifyReply) {
      return {
        statusCode: reply.statusCode,
      };
    },
    req(request: FastifyRequest) {
      return {
        method: request.method,
        url: request.url,
        path: request.routerPath,
        parameters: request.params,
      };
    },
  },
};

export default logger;
