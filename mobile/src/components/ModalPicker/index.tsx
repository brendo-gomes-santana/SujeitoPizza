import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import { categoryProps } from '../../pages/Order'
interface ModalPickerProps{
    options: categoryProps[],
    handleClosemodal: ()=> void;
    selectedItem: (item: categoryProps)=> void
}

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window')

export default function ModalPicker({options, handleClosemodal, selectedItem}: ModalPickerProps) {
   function onPressItem(item:  categoryProps){
        selectedItem(item)
        handleClosemodal()
   }    
   
    const option = options.map((item, index) => (
        <TouchableOpacity key={index} style={style.option} onPress={()=> onPressItem(item)}>
            <Text style={style.item}>
                {item?.name}
            </Text>
        </TouchableOpacity>
    ))

    return (
    <TouchableOpacity onPress={handleClosemodal} style={style.container}>
        <View style={style.content}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {option}
            </ScrollView>
        </View>
    </TouchableOpacity>
  )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        width: WIDTH - 20,
        height: HEIGHT / 2,
        backgroundColor: '#fff',
        borderColor: '#8a8a8a',
        borderRadius: 4
    },
    option: {
        alignItems: 'flex-start',
        borderTopWidth: 0.8,
        borderTopColor: '#8a8a8a'
    },
    item: {
        margin: 18,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#101026'
    }
})
