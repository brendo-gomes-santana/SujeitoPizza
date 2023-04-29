import { Request, Response } from "express";

import { RemoveItemSevicer } from "../../services/order/RemoveItemServece";

class RemoveItemController{
    async handle(req: Request, res: Response){
        const item_id = req.query.item_id as string;

        const removeitemservice = new RemoveItemSevicer();
        const remove = await removeitemservice.execute(item_id)

        return res.json(remove)
    }
}

export { RemoveItemController }