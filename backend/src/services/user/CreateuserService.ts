import prismaClient from '../../prisma/index';
import { hash } from 'bcryptjs';

interface UserRequest {
    name:  string,
    email: string,
    password: string
}
class CreateUserService {
    async execute({name, email, password}:UserRequest){

        //verificar se ele enviou o email
        if(!email){
            throw new Error('Coloque o Email')
        }

        //Verificar se esse email já está cadastrado na db
        const EmailJaExiste = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })
        if(EmailJaExiste){
            throw new Error('Usuário já existe')
        }

        const password_hash = await hash(password, 10);

        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: password_hash
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })

        return user; 
    }
}

export { CreateUserService }