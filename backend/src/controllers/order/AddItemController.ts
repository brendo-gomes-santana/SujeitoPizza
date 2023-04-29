import { Request, Response } from "express";

import { AddItemService } from "../../services/order/AddItemSerice";

class AddItemController {
    async handle(req: Request, res:Response){
        const { order_id, product_id, amount } = req.body

        const additemservice = new AddItemService();
        const item = await additemservice.execute(order_id, product_id, amount)

        return res.json(item)
    }
}

export { AddItemController }