import { Request, Response } from "express";

import { DetailOrderService } from "../../services/order/DetailOrderService";

class DetailOrdersController{
    async handle(req: Request, res: Response){
        const order_id = req.query.order_id as string

        const datilservice = new DetailOrderService();
        const detail = await datilservice.execute(order_id)

        return res.json(detail)
    }
}

export { DetailOrdersController }