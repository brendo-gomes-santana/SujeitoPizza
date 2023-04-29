import prismaClient from "../../prisma";

class ListOrderSercive{
    async execute(){
        const order = await prismaClient.order.findMany({
            where: {
                draft: false,
                status:false
            },
            orderBy:{
                created_at: 'desc'
            }
        })

        return order;
    }
}

export { ListOrderSercive }