import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("Master", 10);

  // Usando findFirst para buscar o usuário pelo nome
  const user = await prisma.user.findFirst({
    where: {
      primary_name: "Carlla",  // Busca pelo nome
    },
    select: {
      id: true,  // Seleciona o id do usuário
    }
  });

  if (!user) {
    console.log("Usuário não encontrado.");
    return;
  }

  // Atualiza o saldo no modelo BalanceUser
  const updatedUserBalance = await prisma.balanceUser.update({
    where: {
      user_id: user.id,  // Usando o id do usuário
    },
    data: {
      balance: 1000.12,  // Atualiza o saldo
    }
  });

  console.log('Saldo atualizado com sucesso!', { updatedUserBalance });
}

main()
  .catch((e) => {
    console.error('Erro ao executar seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
