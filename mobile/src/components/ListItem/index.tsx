import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { ItemnsProps } from '../../pages/Order'

interface ItemProps {
    data: ItemnsProps
    deleteItem: (item_id:string) => void;
}
export default function ListItem({data, deleteItem}: ItemProps) {
  function handleDeleteItem(){
    deleteItem(data.id)
  }

  return (
    <View style={style.container}>
        <Text style={style.item}>{data.amount} - {data.name}</Text>

        <TouchableOpacity onPress={handleDeleteItem}>
            <Feather name='trash-2' color='#ff3f4b' size={25}/>
        </TouchableOpacity>
    </View>
  )
}

const style = StyleSheet.create({
    container:{
        backgroundColor: '#101026',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 12,
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderRadius: 4,
        borderWidth: 0.3,
        borderColor: '#8a8a8a'
    },
    item: {
        color: '#fff'
    }
})