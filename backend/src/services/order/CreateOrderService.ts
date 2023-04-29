import prismaClient from "../../prisma";

class CreateOrderService {
    async execute(table: number, name: string){
        const order = await prismaClient.order.create({
            data: {
                table,
                name
            }
        })

        return order;
    }
}

export { CreateOrderService };