import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies, destroyCookie} from "nookies";
import { AuthTokenError } from "@/services/error/AuthTokenError";

//função para páginas que só users logados podem ter acesso
export function canSSRAuth<P>(fn: GetServerSideProps<P | any>){
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P> | undefined> => {

        const cookies = parseCookies(ctx)
        const token = cookies['@nextauth.token']

        if(!token){
            return{
                redirect:{
                    destination: '/',
                    permanent: false
                }
            }
        }

        try{
            return await fn(ctx);
        }catch(err){
            if(err instanceof AuthTokenError){
                destroyCookie(ctx, '@nextauth.token')
                return{
                    redirect:{
                        destination: '/',
                        permanent: false
                    }
                }
            }
        }

    }
}