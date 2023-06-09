import React, {useState, createContext, ReactNode, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../services/api";

type AuthContextData = {
    user: UserProps,
    isAuthenticated: boolean
    SignIn: (credentials: SignInProps) => Promise<void>;
    SignOut: ()=> Promise<void>;
    loadingAuth: boolean,
    loading: boolean
}
type UserProps = {
    id: string,
    name: string,
    email: string,
    token: string
}

type AuthProviderProps = {
    children: ReactNode
}
type SignInProps ={
    email: string,
    password: string
}
export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({children}: AuthProviderProps){

    const [user,setUser] = useState<UserProps>({
        id: '',
        name: '',
        email: '',
        token: ''
    })

    const [loadingAuth, setLoadingAuth] = useState(false)
    const [loading, setLoading] = useState(true)

    const isAuthenticated = !!user.name

    useEffect(()=> {
        (async()=> {

            //pegar os dados salvos
            const userInfor = await AsyncStorage.getItem('@sujeitopizzaria')
            let hasUser: UserProps = JSON.parse(userInfor || '{}')

            //verificar se recebeu
            if(Object.keys(hasUser).length > 0){
                api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`
                setUser({
                    id: hasUser.id,
                    name: hasUser.name,
                    email: hasUser.email,
                    token: hasUser.token
                })
                
            }
            setLoading(false)
        })()
    },[])

    async function SignIn ({email, password}: SignInProps){
        setLoadingAuth(true)
        setLoading(false)
        try{
            const r = await api.post('/session', {
                email: email,
                password: password
            })

            const { id, name, token} = r.data
            await AsyncStorage.setItem('@sujeitopizzaria', JSON.stringify(r.data))

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

                setUser({
                id,
                name,
                email,
                token
            })

            setLoadingAuth(false)
        
        }catch(error){
            console.log('erro ao acessar', error)
            setLoadingAuth(false)
            setLoading(false)
        }

    }

    async function SignOut(){
        await AsyncStorage.clear()
        .then(()=> {
            setUser({
                id: '',
                name:'',
                email: '',
                token: ''
            })
        })
        setLoading(false)
    }

    return(
        <AuthContext.Provider value={{ user, isAuthenticated, SignIn, SignOut, loadingAuth, loading }}>
            {children}
        </AuthContext.Provider>
    )
}