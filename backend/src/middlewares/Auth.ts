import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";  

interface PayLoad {
    sub: string
}

export function Auth (
    req: Request,
    res: Response,
    next: NextFunction
){
    //receber o token
    const authToken = req.headers.authorization;
    if(!authToken){
        return res.status(401).json({ Error: 'Token não informado' })
    }

    // pegar somente o token
    const [_, token ] = authToken.split(' ')

    // try = caso ter certo || catch = caso ter errado.
    try{
        //validar o token
        const { sub } = verify(
            token,
            process.env.JWT_SECRET
        ) as PayLoad;
        
        // recuperar o id do token e colocar dentro de uma variavel user_id.
        req.user_id = sub
        return next();

    }catch(err){
        return res.status(401).end()
    }


}