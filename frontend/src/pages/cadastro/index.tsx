import { useState, FormEvent, useContext } from 'react';

import Link from 'next/link';

import Head from 'next/head';
import Imagem from 'next/image';

import style from '../../styles/Home.module.scss';

import logoImg from '../../../public/logo.svg';

import  { Input }  from '../../components/ui/Input'
import { Button } from '../../components/ui/button'

import { AuthContext } from '@/contexts/AuthContext';

export default function Cadastro() {

  const { signUp } = useContext(AuthContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignUp = async (e:FormEvent) =>{
    e.preventDefault();

    if(name == '' || email == '' || password == ''){
      alert('Preenchar os campos')
      return;
    }

    setLoading(true)
    await signUp({name, email, password})
    setLoading(false)
    
  } 

  return (
    <>
      <Head>
        <title>Cadastro</title>
      </Head>
      <div className={style.containerCenter}>
        <Imagem src={logoImg} alt='logo'/>

        <div className={style.login}>
        <h1>Criando sua conta</h1>
          <form onSubmit={handleSignUp}>
            <Input placeholder='Digite Seu nome' type='text' value={name} onChange={ v => setName(v.target.value)}/>
            <Input placeholder='Digite seu email' type='email' value={email} onChange={ v => setEmail(v.target.value) }/>
            <Input placeholder='Digite sua senha' type='password' value={password} onChange={ v => setPassword(v.target.value) }/>
          
            <Button type='submit' loading={loading} >Cadastrar</Button>          
          </form>
          <Link href='/' className={style.text}>Já possui conta? Faça seu login</Link>
        </div>
      </div>
    </>

    
  )
}