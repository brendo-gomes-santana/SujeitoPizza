import { Request, Response } from "express";
import { ListByCategoryService } from "../../services/product/ListByCategoryService";

class ListByCategoryController{
    async handle(req: Request, res: Response){
        const category_id = req.query.category_id as string;

        const listbrcategoryservice = new ListByCategoryService();
        const list = await listbrcategoryservice.execute(category_id)


        return res.json(list)
    }
}

export { ListByCategoryController }