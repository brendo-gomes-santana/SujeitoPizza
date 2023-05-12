import { useState } from 'react'

import { canSSRAuth } from "@/utils/canSSRAuth"
import Head from 'next/head'
import Header from "@/components/Header"

import { FiRefreshCcw } from 'react-icons/fi'
import style from './style.module.scss';
import { setupAPIClient } from "@/services/api";

import Modal from 'react-modal';
import { ModalIntem } from '@/components/ModalOrder'

type OrderProps = {
  id: string,
  table: string | number,
  status: boolean,
  draft: boolean,
  name: string | null;

}

interface HomeProps {
  orders: OrderProps[]
}

export type OrderItemProps = {
  id: string,
  amount: string,
  order_id: string,
  product_id: string,
  product: {
    id: string,
    name: string,
    description: string,
    price: string,
    banner: string
  }
  order: {
    id: string,
    table: string | number,
    status: boolean,
    draft: boolean,
    name: string | null;
  }
}

export default function Dashboard({orders}: HomeProps) {

  const [ordersList, setOrdersList] = useState(orders || [])
  const [modalItem, setModalItem] = useState<OrderItemProps[] >()
  const [modalVisible, setModalVisible] = useState(false);

  function handleCloseModal(){
    setModalVisible(false)
  }

  async function handleOpenModalView(id: string){
    const apiClient = setupAPIClient()

    const r = await apiClient.get('/order/detail', {
      params: {
        order_id: id
      }
    })

    setModalItem(r.data)
    setModalVisible(true)
  }
  async function handleFinalizandoOrder(id:string){
    const apiClient = setupAPIClient()

    await apiClient.put('/order/finalizando', {
      order_id: id,
    })
    
    const r = await apiClient.get('/orders')
    setOrdersList(r.data)

    setModalVisible(false)

  }
  async function handleRefreshOrder() {
    const apiClient = setupAPIClient()
    const r = await apiClient.get('/orders')
    setOrdersList(r.data)
  }

  Modal.setAppElement('#__next')

  return (
    <>
      <Head>
        <title>Painel - Sujeito Pizzaria</title>
      </Head>
      <Header/>
      <main className={style.container}>
        <div className={style.containerHeader}>
          <h1>Últimos pedidos</h1>
          <button
          onClick={handleRefreshOrder}
          > <FiRefreshCcw color='#3fffa3' size={25}/> </button>
        </div>

        <article className={style.listOreders}>
          {ordersList.length === 0 && (
            <p>Nenhum pedido aberto no momento</p>
          )}

          { ordersList.map((i)=> {
            return(
              <section className={style.orderItem} key={i.id}>
              <button onClick={()=> handleOpenModalView(i.id)}>
                <div className={style.tag}></div>
                <span>Mesa {i.table}</span>
              </button>
            </section>
            )
          }) }
        </article>
        
      </main>
      {modalVisible && (
        <ModalIntem 
        isOpen={modalVisible}
        onRequestClose={handleCloseModal}
        order={modalItem}
        handleFinzaliando={handleFinalizandoOrder}
        />
      )}
    </>
  )
}


export const getServerSideProps = canSSRAuth(async (ctx: any) => {
  const apiClient = setupAPIClient(ctx)
  const r = await apiClient.get('/orders')
  
  return{
    props: {
      orders: r.data
    }
  }
})