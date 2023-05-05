import { createContext, ReactNode, useState } from "react";
import { destroyCookie, setCookie, parseCookies } from 'nookies';
import Router from 'next/router';

import { api } from '../services/apiClient';
import { AxiosError } from "axios";
import { useEffect } from 'react';

type AuthContextData = {
    user: UserProps | undefined;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
    signUp: (credentials: SignUpProps) => Promise <void>
}

type UserProps = {
    id: string;
    name: string; 
    email: string;
}

type SignInProps = {
    email: string;
    password: string
}

type AuthProviderProps = {
    children: ReactNode
}
type SignUpProps = {
    name: string,
    email:string,
    password: string
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut(){
    try{
        destroyCookie(undefined, '@nextauth.token')
        Router.push('/')
    }catch{
        console.log('error ao deslogar')
    }
}

export function AuthProvider({ children }: AuthProviderProps){
    const [user, setUser] = useState<UserProps | undefined>()
    const isAuthenticated = !!user;
    useEffect (()=> {
        //tentar pegar o token
        const { '@nextauth.token':token } = parseCookies()
        if(token){
            api.get('/usuario').then(response => {
                const { id, name, email } = response.data;

                setUser({
                    id,
                    name,
                    email
                })
            })
            .catch(()=> {
                signOut()
            })
        }

    },[])

    async function signIn({email, password}: SignInProps){
        try{
            const r = await api.post('/session' ,{
                email,
                password
            })
            const { id, name, token } = r.data
            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30, // expirar em 1 mês
                path: '/' // quais caminhos terão acesso ao cookie, no caso a /, que disse tudos.
            })

            setUser({
                id,
                name,
                email
            })

            //passar para proximas requisições o nosso token
            api.defaults.headers['authorization'] = `Bearer ${token}`

            //Redirecionar o user para /dashboard.
            Router.push('/dashboard')

        }catch(err){
            console.log('Erro ao acessar: ', err)
        }
    }

    async function signUp({name, email, password}: SignUpProps){
        try{
            await api.post('/users', {
                name,
                email,
                password
            })

            alert('Cadastrado com sucesso')
            Router.push('/')

        }catch(erro: AxiosError | any){
            alert(erro.response.data.error)
        }
    }

    return(
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp}}>
            {children}
        </AuthContext.Provider>
    )
}