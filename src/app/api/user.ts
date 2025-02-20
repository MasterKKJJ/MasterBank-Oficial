import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUserWithDetails(cpf: string) {
    try {
        const user = await prisma.user.findFirst({
            where: { 
                info:{
                    cpf
                }
             },
            include: {
                info: true,
                balance: true

            }
        });

        if (!user) {
            console.log('Usuário não encontrado!');
            return null;
        }

        return user;
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        return null;
    }
}
export async function getUserBalanceByCpf(cpf: string) {
    try {
        const user = await prisma.user.findFirst({
            where: { 

                  info:{
                    cpf
                }
             },
            
            select: {
                balance: true,
                
            }
        });

        if (!user) {
            console.log('Usuário não encontrado!');
            return null;
        }

        return user;
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        return null;
    }

}