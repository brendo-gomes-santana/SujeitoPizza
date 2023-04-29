import { Response } from "express";

import { ListOrderSercive } from "../../services/order/ListOrderService";

class ListOnderController {
    async handle(_, res: Response){
        const listorderservice = new ListOrderSercive()
        const list = await listorderservice.execute();

        return res.json(list)
    }
}

export { ListOnderController }