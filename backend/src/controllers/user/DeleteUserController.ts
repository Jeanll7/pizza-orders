// Importações necessárias
import { Request, Response } from "express";
import { DeleteUserService } from "../../services/user/DeleteUserService";

class DeleteUserController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteUserService = new DeleteUserService();

    await deleteUserService.execute(id);

    return res.status(204).send(); // 204 No Content - Indica que a solicitação foi bem-sucedida, mas não há conteúdo para enviar no corpo da resposta.
  }
}

export { DeleteUserController };
