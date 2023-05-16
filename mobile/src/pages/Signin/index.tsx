import React, { useState, useContext } from 'react'
import { View, 
  Text, 
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'

import { AuthContext } from '../../contexts/AuthContext';

export default function Signin() {
  
  const { SignIn, loadingAuth } = useContext(AuthContext)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  async function handleLogin(){
    if(!email || !password){
      return alert('preenchar os campos')
    }
    await SignIn({email, password})
  }

  return (
    <View style={style.continer}>
        <Image 
          style={style.logo}
          source={require('../../assets/logo.png')}/>
          
          <View style={style.inputContainer}>
              <TextInput 
              placeholder='Digite seu email' 
              style={style.input} 
              placeholderTextColor='#f0f0f0' 
              value={email}
              onChangeText={(v)=> setEmail(v)}/>

              <TextInput 
              placeholder='Digite sua senha' 
              style={style.input} 
              placeholderTextColor='#f0f0f0'
              secureTextEntry={true}
              value={password} 
              onChangeText={(v)=> setPassword(v)}/>
              
              <TouchableOpacity style={style.button} onPress={handleLogin}>
                {loadingAuth ? <ActivityIndicator size={25} color='#fff'/> : 
                <Text style={style.buttontext}>Acessar</Text>
                }
              </TouchableOpacity>
          </View>
    </View>
  )
}


const style = StyleSheet.create({
  continer:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1d1d2e'
  },
  logo: {
    marginBottom: 18,
  },
  inputContainer: {
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    paddingHorizontal: 14
  },
  input: {
    width: '95%',
    height: 40,
    backgroundColor: '#101026',
    marginBottom: 12,
    borderRadius: 4,
    paddingHorizontal: 8,
    color:'#fff'
  },
  button:{
    width:'95%',
    height: 40,
    backgroundColor: '#3fffa3',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttontext: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#101026'
  }
})
