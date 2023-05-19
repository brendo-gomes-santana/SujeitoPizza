import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'

export default function FinishOrder() {
  return (
    <View style={style.container}>
        <Text style={style.alert}>Você deseja finializar o pedido?</Text>
        <Text style={style.title}>Mesa: 30</Text>
        <TouchableOpacity style={style.button}>
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
