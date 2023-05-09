import Head from "next/head";
import { useState, FormEvent } from 'react';
import Header from "@/components/Header"
import style from './style.module.scss';
import { setupAPIClient } from "@/services/api";
import { canSSRAuth } from "@/utils/canSSRAuth";

export default function Category() {


  const [name, setName] = useState('');
  const HandleAdd = async (e:FormEvent) => {
    e.preventDefault()
    
    if(name === ''){
      return;
    }

    const apiClient = setupAPIClient()
    await apiClient.post('category', {
      name
    })
    setName('')
    alert('Cadastrado com sucesso')
  }

  return (
    <>
    <Head>
      <title>Nova catergoria</title>
    </Head>
    <Header/>
    <main className={style.container}>
      <h1>Nova Cartegoria</h1>
      <form className={style.form} onSubmit={HandleAdd}>
        <input type='text' placeholder="Nova Cartegoria" className={style.input}
        value={name} onChange={(v) => setName(v.target.value)}/>
        <button className={style.buttonADD} type='submit'>Cadastrar</button>
      </form>
    </main>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return{
    props: {}
  }
} )
