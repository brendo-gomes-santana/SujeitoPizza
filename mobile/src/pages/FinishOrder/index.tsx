import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'

import { useNavigation, useRoute, RouteProp  } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackPramsList } from '../../routes/app.routes'
import { api } from '../../services/api'
type RouteDetailParams = {
    FinishOrder: {
        number: string | number,
        order_id: string
    }
    
}
type FinishOrderRouteProp = RouteProp<RouteDetailParams, 'FinishOrder'>
export default function FinishOrder() {
    const navigation = useNavigation<NativeStackNavigationProp<StackPramsList>>()
    const route = useRoute<FinishOrderRouteProp>()

    async function handleConclui(){
        await api.put('/order/send', {
            order_id: route.params?.order_id
        })
        //volta pro inicio da sua tela
        navigation.popToTop()
    }

  return (
    <View style={style.container}>
        <Text style={style.alert}>Você deseja finializar o pedido?</Text>
        <Text style={style.title}>Mesa: {route.params?.number}</Text>
        <TouchableOpacity style={style.button} onPress={handleConclui}>
            <Text style={style.textButton}>Finalizar pedido</Text>
            <Feather name='shopping-cart' size={20} color='#1d1d2e'/>
        </TouchableOpacity>
    </View>
  )
}

const style = StyleSheet.create({
    container: {
         flex: 1,
         backgroundColor: '#1d1d2e',
         paddingHorizontal: '5%',
         paddingVertical: '5%',
         alignItems: 'center',
         justifyContent: 'center'
    },
    alert: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 12,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 12,
    },
    button: {
        backgroundColor: '#3fffa3',
        flexDirection: 'row',
        width: '65%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textButton: {
        fontSize: 18,
        marginRight: 8,
        fontWeight: 'bold',
        color: '#1d1d2e'
    }
})
