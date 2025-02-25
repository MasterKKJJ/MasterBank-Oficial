import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // const hashedPassword = await bcrypt.hash("Master", 10);

  // // Usando findFirst para buscar o usuário pelo nome
  // const user = await prisma.user.findFirst({
  //   where: {
  //     primary_name: "Carlla",  // Busca pelo nome
  //   },
  //   select: {
  //     id: true,  // Seleciona o id do usuário
  //   }
  // });

  // if (!user) {
  //   console.log("Usuário não encontrado.");
  //   return;
  // }

  // // Atualiza o saldo no modelo BalanceUser
  // const updatedUserBalance = await prisma.balanceUser.update({
  //   where: {
  //     user_id: user.id,  // Usando o id do usuário
  //   },
  //   data: {
  //     balance: 1000.12,  // Atualiza o saldo
  //   }
  // });

  // console.log('Saldo atualizado com sucesso!', { updatedUserBalance });


  // Colocando uma notificacao:
  const user = await prisma.user.findFirst({
    where: {
      primary_name: "Carlla",  // Busca pelo nome
    },
    select: {
      id: true,  // Seleciona o id do usuário
    }
  });

  // const notificacao = await prisma.notifyUser.create({
  //   data: {

  //     content: "Compra de R$ 5,00 em Mercado teste",
  //     title: "Compra no debito aprovada",
  //     type: "TRANSFERENCIA",
  //     user_id: user?.id,

  //   }
  // })


  // const notificacao = await prisma.notifyUser.upsert({
  //   where: {
  //     id: "67bdeaf757985a1cfb5450e4"
  //   },
  //   update: {
  //     content: 'Compra de R$ 5,00 em Mercado Marcelo 123'
  //   },
  //   create: {
  //     id: "67bdeaf757985a1cfb5450e4",
  //     user_id: "67b9436e409b0fbff8877022",
  //     title: "Compra no débito aprovada",
  //     content: "Compra de R$ 5,00 em Mercado Teste123",
  //     type: "TRANSFERENCIA"
  //   }
  // });


  // const notificacao = await prisma.notifyUser.findMany({
  //   where: { user_id: user?.id },

  // })

  console.log('Saldo atualizado com sucesso!', { notificacao });

}

main()
  .catch((e) => {
    console.error('Erro ao executar seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
