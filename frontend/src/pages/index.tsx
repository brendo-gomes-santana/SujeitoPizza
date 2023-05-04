import Head from 'next/head';
import Imagem from 'next/image';
import style from '../styles/Home.module.scss';

import logoImg from '../../public/logo.svg';

import  { Input }  from '../components/ui/Input'
import { Button } from '../components/ui/button'

export default function Home() {
  return (
    <>
      <Head>
        <title>SujeitoPizza</title>
      </Head>
      <div className={style.containerCenter}>
        <Imagem src={logoImg} alt='logo'/>

        <div className={style.login}>
          <form>
            <Input placeholder='Digite seu email' type='text'/>
            <Input placeholder='Digite sua senha' type='password'/>
          
            <Button type='button' loading={false} >Acessar</Button>          
          </form>
        </div>
      </div>
    </>

    
  )
}
