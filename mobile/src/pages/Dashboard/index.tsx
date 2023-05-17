import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackPramsList } from '../../routes/app.routes';

//SefeAreaView é para quem ta usando IPhone, que tem a area de cima com a camera
import {SafeAreaView, Text, TextInput,TouchableOpacity ,StyleSheet } from 'react-native'
import { api } from '../../services/api';
export default function Dashboard() {
  const navigation = useNavigation<NativeStackNavigationProp<StackPramsList>>()

  const [numeroDaMesa, setNumeroDaMesa] = useState('')

  async function openOrder(){
    if(!numeroDaMesa){
      return;
    }
    try{
      const r = await api.post('/order', {
        table: Number(numeroDaMesa)
      })

      navigation.navigate('Order', {
        number: r.data.table,
        order_id: r.data.id
      })
      setNumeroDaMesa('')
    }catch(erro){
      console.log(erro)
    }
  }

  return (
    <SafeAreaView style={style.container}>
      <Text style={style.title}>Novo Pedido</Text>
      <TextInput
        style={style.input}
        placeholder='Número da mesa'
        placeholderTextColor='#f0f0f0'
        keyboardType='numeric'
        value={numeroDaMesa}
        onChangeText={(v) => setNumeroDaMesa(v)}
      />

      <TouchableOpacity style={style.button} onPress={openOrder}>
        <Text style={style.buttonText}>Abrir Mesa</Text>
      </TouchableOpacity>

    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent: 'center',
    paddingVertical: 15,
    backgroundColor: '#1d1d2e',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24,
  },
  input: {
    width: '90%',
    height: 60,
    backgroundColor: '#101026',
    borderRadius: 4,
    paddingHorizontal: 8,
    textAlign: 'center',
    fontSize: 22,
    color: '#fff'
  },
  button: {
    width: '90%',
    height: 40,
    backgroundColor: '#3fffa3',
    borderRadius: 4,
    marginVertical: 14,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: '#101026',
    fontWeight: 'bold'
  }
})
