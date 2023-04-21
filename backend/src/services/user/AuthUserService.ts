import prismaClient from "../../prisma";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface AuthRequeste {
    email: string,
    password: string
}
class AuthUserService {
    async execute({email, password}:AuthRequeste){

        //verificar se o email existe
        const EmailExiste = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if(!EmailExiste){
            throw new Error('Email/Senha não existe')
        }

        //preciso verificar se a senha é certa
        const verificarSenha = await compare(password, EmailExiste.password)

        if(!verificarSenha){
            throw new Error('Email/Senha não existe')
        }

        // se deu tudo certo, vamos gerar o token
        const token = sign(
            {
                name: EmailExiste.name,
                email: EmailExiste.email,
            },
            process.env.JWT_SECRET,
            {
                subject: EmailExiste.id,
                expiresIn: '15d'
            }
        )

        return { 
            id: EmailExiste.id,
            name: EmailExiste.name,
            email: EmailExiste.email,
            token: token
         }
    }
}

export { AuthUserService }