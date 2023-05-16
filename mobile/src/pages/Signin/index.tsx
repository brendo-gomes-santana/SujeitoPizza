import React from 'react'
import { View, 
  Text, 
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native'

export default function Signin() {
  return (
    <View style={style.continer}>
        <Image 
          style={style.logo}
          source={require('../../assets/logo.png')}/>

          <View style={style.inputContainer}>
              <TextInput 
              placeholder='Digite seu email' 
              style={style.input} 
              placeholderTextColor='#f0f0f0'/>

              <TextInput 
              placeholder='Digite sua senha' 
              style={style.input} 
              placeholderTextColor='#f0f0f0'
              secureTextEntry={true}/>
              
              <TouchableOpacity style={style.button}>
                <Text style={style.buttontext}>Acessar</Text>
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
