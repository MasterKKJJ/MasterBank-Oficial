import { PrismaClient } from '@prisma/client';import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();                                                                                              async function main() {                                                              
    const hashedPassword = await bcrypt.hash("Master", 10);
    const user = await prisma.user.create({
      data: {
        primary_name: 'Enderson',
        rest_of_name: 'Alves da Silva',
        password: hashedPassword,
        cpf: "70526806290",
        email: 'masterzarby@gmail.com',
        phone: '11987654321',
        account_number: 123456,
        balance: {
          
          create: { 
            
            balance: 10 }, // Criando o saldo inicial do usuário
        },
        
      },
    });
    console.log('Seed conclusão com sucesso!', { user });
}
main()
    .catch((e) => {
        console.error('Erro ao executar seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });