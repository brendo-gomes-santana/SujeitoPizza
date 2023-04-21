import { Request, Response } from "express";
import { CreatecategoryService } from "../../services/category/CreatecategoryService";
class CreateCategoryController {
    async handle(req: Request, res: Response){

        const createcategoryService = new CreatecategoryService();
        const category = await createcategoryService.execute();

        return res.json(category)

    }
}
export { CreateCategoryController };
