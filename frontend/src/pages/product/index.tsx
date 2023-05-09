import Head from "next/head"
import Header from "@/components/Header"
import {ChangeEvent, useState , FormEvent} from 'react';

import { canSSRAuth } from "@/utils/canSSRAuth"
import style from './style.module.scss'
import { FiUpload } from 'react-icons/fi';
import { setupAPIClient } from "@/services/api";

type ItemProps = {
    id: string,
    name: string
}
interface CategoryProps {
    categoryList: ItemProps[]
}
export default function Product({categoryList}: CategoryProps) {
    console.log(categoryList)
    const [avatarurl, setAvatarurl] = useState('')
    const [imagemAvatar, setImagemAvatar] = useState<File | null>(null);

    const [category, setCategory] = useState(categoryList || [])
    const [categorySelected, setCategorySelectd] = useState(0)

    function handleFile(e:ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) {
          return;
        }
    
        const image = e.target.files[0];
        if (!image) {
          return;
        }
      
        if (image.type === 'image/jpeg' || image.type === 'image/png') {
          setImagemAvatar(image);
          setAvatarurl(URL.createObjectURL(e.target.files[0]));
        }
      }

      function handleChaneCategory(e: any){
        //console.log(category[e.target.value])
        setCategorySelectd(e.target.value)
      }

  return (
    <>
    <Head>
        <title>Novo Product</title>
    </Head>
    <Header/>
    <main className={style.container}>
        <h1>Novo Produto</h1>
        <form className={style.form}>
            <label className={style.labelAvatar}>
                <span><FiUpload size={30} color='#fff'/></span>
                <input type='file' accept="image/png, image/jpeg" onChange={handleFile}/>
                {avatarurl && (<img src={avatarurl} alt='Foto do produto' className={style.preview}/>)}
                
            </label>

            <select value={categorySelected} onChange={handleChaneCategory}>
                {category.map( (i, index) => {
                    return(
                        <option key={i.id} value={index}>{i.name}</option>
                    )
                })}

            </select>
            <input placeholder="Digite o novo do produto" className={style.input}/>
            <input placeholder="preço do produto" className={style.input}/>
            <textarea placeholder="Descreva seu produto" className={style.input}/>
            <button type='submit' className={style.buttonAdd}>Cadastrar</button>
        </form>
    </main>
    </>
  )
}
export const getServerSideProps = canSSRAuth(async (context: any) => {
    const apliClient = setupAPIClient(context);
    const r = await apliClient.get('/category');
    

  
    return {
      props: {
        categoryList: r.data
      },
    };
  });
  