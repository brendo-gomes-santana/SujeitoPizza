import Link from 'next/link';
import { useContext, FormEvent, useState } from 'react'
import Head from 'next/head';
import Imagem from 'next/image';

import style from '../styles/Home.module.scss';

import logoImg from '../../public/logo.svg';

import  { Input }  from '../components/ui/Input'
import { Button } from '../components/ui/button'

import { AuthContext } from '../contexts/AuthContext';


export default function Home() {

  const  { signIn } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function text(event: FormEvent){
    event.preventDefault()
    

    await signIn({email, password})
  }
  return (
    <>
      <Head>
        <title>SujeitoPizza</title>
      </Head>
      <div className={style.containerCenter}>
        <Imagem src={logoImg} alt='logo'/>

        <div className={style.login}>
          <form onSubmit={text}>
            <Input placeholder='Digite seu email' type='text'
            value={email} onChange={(v)=> setEmail(v.target.value)}/>

            <Input placeholder='Digite sua senha' type='password'
            value={password} onChange={(v) => setPassword(v.target.value)}/>
          
            <Button type='submit' loading={false} >Acessar</Button>          
          </form>
          <Link href='/cadastro' className={style.text}>Não possui conta? faça já o seu cadastro</Link>
        </div>
      </div>
    </>

    
  )
}
