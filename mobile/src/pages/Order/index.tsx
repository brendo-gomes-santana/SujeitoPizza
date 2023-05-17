import React, { useState, useEffect } from 'react'
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity, TextInput, Modal, FlatList } from 'react-native'
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native'

import { Feather } from '@expo/vector-icons'
import { api } from '../../services/api'

import ModalPicker from '../../components/ModalPicker'
import ListItem from '../../components/ListItem'
type RouteDetailParams = {
    Order: {
        number: string | number;
        order_id: string
    }
}
export type categoryProps = {
    id: string,
    name: string
}

type ProductProps = {
    id: string,
    name: string
}
export type ItemnsProps = {
    id: string,
    product_id: string,
    name: string | undefined | null,
    amount: string | number

}
type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>

export default function Order() {

    const [category, setCategory] = useState<categoryProps[] | []>([])
    const [categorySelected, setCategprySelected] = useState<categoryProps | undefined>()
    
    const [product, setProduct] = useState<ProductProps[] | []>([])
    const[productSelected, setproductSelected] = useState<ProductProps | undefined>()

    const [amount, setAmount] = useState('1')

    const [items, setItems] = useState<ItemnsProps[]>([])

    const route = useRoute<OrderRouteProps>()
    const navigate = useNavigation()

    const [ModalCategoryVisible, setModalCategoryVisible] = useState(false)
    const [ModalProductVisible, setModalProductVisible] = useState(false)

    useEffect(()=> {
        (async() => {
            const r = await api.get('/category')

            setCategory(r.data)
            setCategprySelected(r.data[0])
        })()
    },[])

    useEffect(()=> {
        (async()=>{
            const r = await api.get('/category/product', {
                params: {
                    category_id: categorySelected?.id
                }
            })
            setProduct(r.data)
            setproductSelected(r.data[0])
        })()
    }, [categorySelected])

    async function handleCloseOrder() {
        try{
            await api.delete('/order', {
                params: {
                    order_id: route.params?.order_id
                }
            })
            //goback vai fazer volta uma tela pra trás
            navigate.goBack()
        }catch(erro){
            console.log('ocorreu um erro')
        }
    }
    //adicionando um produto
   async function handleAddItem(){

    const r = await api.post('/order/add', {
        order_id: route.params.order_id,
        product_id: productSelected?.id,
        amount: Number(amount)

    })
    let data = {
        id: r.data.id,
        product_id: productSelected?.id as string,
        name: productSelected?.name as string,
        amount: amount
    }

    setItems(oldArray => [...oldArray, data])
   }
  return (
    <SafeAreaView style={style.container}>
        <View style={style.header}>
            <Text style={style.title}>Mesa {route.params.number}</Text>
            {items.length === 0 && (
                <TouchableOpacity onPress={handleCloseOrder}>
                    <Feather name='trash-2' color='#ff3f4b' size={28}/>
                </TouchableOpacity>
            )}
            
        </View>

        {category.length !== 0 && (
            <TouchableOpacity style={style.input} onPress={() => setModalCategoryVisible(true)}>
            <Text style={{color: '#fff'}}>
                {categorySelected?.name}
            </Text>
        </TouchableOpacity>
        )}
        {product.length !== 0 && (
            <TouchableOpacity style={style.input} onPress={() => setModalProductVisible(true)}>
              <Text style={{color: '#fff'}}>
                {productSelected?.name}
              </Text>
            </TouchableOpacity>
        )}
      
        <View style={style.qtdContainer}>
            <Text style={style.qtdText}>Quandidade</Text>
            <TextInput placeholder='' 
            placeholderTextColor='#fff' keyboardType='numeric' style={[style.input, {width: '60%', textAlign: 'center'}]}
            value={amount} onChangeText={(v) => setAmount(v)}/>
        </View>
        
        <View style={style.actions}>
            <TouchableOpacity style={style.buttonAdd} onPress={handleAddItem}>
                <Text style={style.buttonText}>+</Text>
            </TouchableOpacity>

            <TouchableOpacity 
            disabled={items.length === 0}
            style={[style.button, {opacity: items.length === 0 ? 0.3 : 1}]}>
                <Text style={style.buttonText}>Avançar</Text>
            </TouchableOpacity>
        </View>
        <FlatList showsVerticalScrollIndicator={false}
        style={{flex: 1, marginTop: 24}}
        data={items}
        keyExtractor={(item)=> item.id}
        renderItem={({ item })=> <ListItem data={item}/> } />
        
        <Modal 
            transparent={true}
            visible={ModalCategoryVisible}
            animationType='fade'>

            <ModalPicker 
                handleClosemodal={() => setModalCategoryVisible(false)}
                options={category}
                selectedItem={ (item: categoryProps) => {setCategprySelected(item)}}
            />
        </Modal>

        <Modal
        transparent={true}
        visible={ModalProductVisible}
        animationType='fade'>

            <ModalPicker
            handleClosemodal={()=> setModalProductVisible(false)}
            options={product}
            selectedItem={(item: ProductProps)=> {setproductSelected(item)}}
            />

        </Modal>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1d1d2e',
        paddingVertical: '5%',
        paddingEnd: '4%',
        paddingStart: '4%'
    },
    header: {
        flexDirection: 'row',
        marginBottom: 12,
        alignItems: 'center',
        marginTop: 24,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        marginRight: 14
    },
    input: {
        backgroundColor: '#101026',
        borderRadius: 4,
        width: '100%',
        height: 40,
        marginBottom: 12,
        justifyContent: 'center',
        paddingHorizontal: 8,
        color: '#fff',
        fontSize: 20
    },
    qtdContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    qtdText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    actions: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    buttonAdd: {
        width: '20%',
        backgroundColor: '#3fd1ff',
        borderRadius: 4,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#101026',
        fontSize: 18,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: '#3fffa3',
        height: 40,
        width: '75%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4
    }
})
