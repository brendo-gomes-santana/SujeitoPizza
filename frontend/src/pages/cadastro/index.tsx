import Link from 'next/link';

import Head from 'next/head';
import Imagem from 'next/image';

import style from '../../styles/Home.module.scss';

import logoImg from '../../../public/logo.svg';

import  { Input }  from '../../components/ui/Input'
import { Button } from '../../components/ui/button'

export default function Cadastro() {
  return (
    <>
      <Head>
        <title>Cadastro</title>
      </Head>
      <div className={style.containerCenter}>
        <Imagem src={logoImg} alt='logo'/>

        <div className={style.login}>
        <h1>Criando sua conta</h1>
          <form>
            <Input placeholder='Digite Seu nome' type='text'/>
            <Input placeholder='Digite seu email' type='email'/>
            <Input placeholder='Digite sua senha' type='password'/>
          
            <Button type='button' loading={false} >Cadastrar</Button>          
          </form>
          <Link href='/' className={style.text}>Já possui conta? Faça seu login</Link>
        </div>
      </div>
    </>

    
  )
}