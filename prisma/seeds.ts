import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Cria ou atualiza um usuário
    const user = await prisma.user.upsert({
        where: { nickname: 'Enderson Alves da Silva' },
        update: {
            nickname: 'Enderson',
            nome_completo: "Enderson Alves da Silva",
        },
        create: {
            nome_completo: 'Enderson Alves da Silva',
            nickname: 'Enderson',
        },
    });

    // Criar ou atualizar o saldo do usuário
    const balance = await prisma.balanceUser.upsert({
        where: { user_id: user.id }, // user_id precisa ser único
        update: {
            money_amount: 23012.12,
        },
        create: {
            user_id: user.id,
            money_amount: 1510.80,
        },
    });

    // Criar ou atualizar as informações do usuário
    const info = await prisma.infoUser.upsert({
        where: { user_id: user.id }, // user_id precisa ser único
        update: {
            cpf: '73281233819',
            rg: '93039202',
            numero_banco: '00012',
            conta: '239010-9'
        },
        create: {
            user_id: user.id,
            cpf: '91919191919',
            rg: '987654322',
            numero_banco: '001222',
            conta: '12345-6',
        },
    });

    console.log('Seed concluído com sucesso!', { user, balance, info });
}

main()
    .catch((e) => {
        console.error('Erro ao executar seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
