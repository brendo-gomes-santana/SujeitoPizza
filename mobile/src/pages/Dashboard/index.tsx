import React, {useContext} from 'react'
import { View, Text, Button } from 'react-native'

import { AuthContext } from '../../contexts/AuthContext'
export default function Dashboard() {
  const { SignOut } = useContext(AuthContext)

  return (
    <View>
        <Text>Outra</Text>
        <Button title='Sair do app' onPress={SignOut}/>
    </View>
  )
}
