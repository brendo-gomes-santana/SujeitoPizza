import prismaClient from "../../prisma";
class CreatecategoryService{
    async execute(name:string){

        //verifacar se colocou a categoria
        if(!name){
            throw new Error("Coloque a categoria")
        }

        //verificar se categoria já existe no db
        const categoria = await prismaClient.category.findFirst({
            where:{
                name: name
            }
        })
        if(categoria){
            throw new Error("categoria já existe")
        }

        const CriarCategoria = await prismaClient.category.create({
            data:{
                name: name
            },
            select: {
                id: true,
                name: true
            }
        })
        return CriarCategoria;
    }
}

export { CreatecategoryService };