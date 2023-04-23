import { Response } from "express";
import { ListCategoryService } from "../../services/category/ListCategoryService";

class ListCategoryController {
    async handle(_, res: Response){
        const listcategory = new ListCategoryService();
        const list = await listcategory.execute()

        return res.json(list);
    }
}

export { ListCategoryController };