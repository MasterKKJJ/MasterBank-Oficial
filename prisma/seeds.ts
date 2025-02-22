import { PrismaClient } from '@prisma/client'; import bcrypt from 'bcryptjs';
const prisma = new PrismaClient(); async function main() {
  const hashedPassword = await bcrypt.hash("Master", 10);


  const users = await prisma.user.createMany({
    data:[
      {
        account_number: 1234568,
        cpf: "8974337276",
        email: "carllacabecao@gmail.com",
        primary_name: "Carlla",
        rest_of_name: "Victoria Soares Costa",
        password: hashedPassword,
        phone: "559293812397",
        
      }

    ]

  });

  console.log('Seed conclusão com sucesso!', { users });
}
main()
  .catch((e) => {
    console.error('Erro ao executar seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });