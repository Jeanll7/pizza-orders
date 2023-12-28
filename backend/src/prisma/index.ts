import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function queryDatabase() {
  try {
    const result = await prisma.user.findMany();
    console.log(result);
  } catch (erro) {
    console.error("Erro ao executar a consulta:", erro);
  } finally {
    await prisma.$disconnect();
  }
}

queryDatabase();

export default prisma;
