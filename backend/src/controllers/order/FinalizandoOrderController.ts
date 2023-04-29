import { Request, Response } from "express";

import { FinalizadoOrderService } from "../../services/order/FinalizadoOrderService";

class FinalizandoOrderController{
    async handle(req: Request, res: Response){
        const { order_id } = req.body

        const finalizandoservice = new FinalizadoOrderService();
        const finalizando = await finalizandoservice.execute(order_id)

        return res.json(finalizando);
    }
}

export { FinalizandoOrderController }