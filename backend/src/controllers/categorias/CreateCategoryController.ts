import { Request, Response } from "express";
import { CreatecategoryService } from "../../services/category/CreatecategoryService";

class CreateCategoryController {
    async handle(req: Request, res: Response){
        const name = req.body.name
        
        const createcategoryService = new CreatecategoryService();
        const category = await createcategoryService.execute(name);

        return res.json(category)

    }
}
export { CreateCategoryController };
