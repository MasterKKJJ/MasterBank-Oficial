import { PrismaClient } from '@prisma/client';

declare global {
    // Permite que a instância seja reutilizada sem criar múltiplas conexões em desenvolvimento.
    var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
    global.prisma = prisma;
}
