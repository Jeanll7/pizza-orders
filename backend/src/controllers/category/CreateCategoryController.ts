import { Request, Response } from "express";
import { CreateCategoryService } from "../../services/category/CreateCategoryService";

class CreateCategoryController {
  async handle(req: Request, res: Response) {
    // const createCategoryService = new CreateCategoryService();
    // const category = await createCategoryService.execute();

    const category = await new CreateCategoryService().execute(req.body);

    return res.status(201).json(category);
  }
}

export { CreateCategoryController };
