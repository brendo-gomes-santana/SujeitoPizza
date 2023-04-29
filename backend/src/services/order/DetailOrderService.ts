import prismaClient from "../../prisma";

class DetailOrderService{
    async execute(order_id:string){
        const orders = await prismaClient.item.findMany({
            where: { order_id },

            //esse include me devolce tudo que tá as relações que tem dentro.
            include: {
                product: true,
                
                //se eu quiser do devolcer o produto eu posso.
                order:true
            },
        }) 

        return orders;
    }

}


export { DetailOrderService }