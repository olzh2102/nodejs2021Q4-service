import { FastifyRequest, FastifyReply } from 'fastify';
import bcrypt from 'bcryptjs';

export async function generateHashPassword(password: string) {
  const salt = await bcrypt.genSalt(
    parseInt(process.env.SALT_SIZE as string, 10)
  );
  const out = await bcrypt.hash(password, salt);

  return out;
}

const authenticate = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const route = req.url.split('/');
    if (['users', 'tasks', 'boards'].includes(route[1])) await req.jwtVerify();
  } catch (error) {
    reply.code(401).send();
  }
};

export default authenticate;
