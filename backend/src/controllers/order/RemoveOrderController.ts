import { Request, Response } from "express";
import { RemoveOrderService } from "../../services/order/RemoveOrderService";

class RemoveOrderController{
    async handle(req: Request, res: Response){
        const order_id = req.query.order_id as string

        const removeorderservice = new RemoveOrderService();
        const remove = await removeorderservice.execute(order_id)

        return res.json(remove)
    }
}

export { RemoveOrderController }