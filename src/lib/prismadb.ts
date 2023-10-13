import { Prisma } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

function setOffsetTime(object: any, offsetTime: number) {
  if (object === null || typeof object !== 'object') return;

  for (const key of Object.keys(object)) {
    const value = object[key];
    if (value instanceof Date) {
      object[key] = new Date(value.getTime() + offsetTime);
    } else if (value !== null && typeof value === 'object') {
      setOffsetTime(value, offsetTime);
    }
  }
}

export const timezoneMiddleware: Prisma.Middleware = async (params, next) => {
  const offsetTime = 9 * 60 * 60 * 1000;

  setOffsetTime(params.args, offsetTime);
  const result = await next(params);
  setOffsetTime(result, -offsetTime);

  return result;
};

const prismaClientSingleton = () => {
  const prisma = new PrismaClient();
  prisma.$use(timezoneMiddleware);
  return prisma;
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
