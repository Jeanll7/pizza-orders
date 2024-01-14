import prismaClient from "../../prisma";

class DeleteUserService {
  async execute(user_id: string): Promise<void> {
    try {
      // Verificar se o usuário existe antes de excluí-lo
      const existingUser = await prismaClient.user.findUnique({
        where: {
          id: user_id,
        },
      });

      if (!existingUser) {
        throw new Error('Usuário não encontrado');
      }

      // Excluir o usuário
      await prismaClient.user.delete({
        where: {
          id: user_id,
        },
      });

    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      throw new Error('Erro ao excluir usuário');
    }
  }
}

export { DeleteUserService };
