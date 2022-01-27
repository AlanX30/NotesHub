import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Keyboard } from 'react-native'
import { CheckBox } from 'react-native-elements'
import { useFormValues } from '../hooks/useFormValues'
import { request } from '../api'
import { useNavigation } from '@react-navigation/native'

const FormTicks = ({ id, isNew, initialTitle, initialList }) => {

    const navigation = useNavigation()

    const title = useFormValues(initialTitle)

    const [ countId, setCountId ] = useState(initialList.length)

    const [ listCheckBox, setListCheckBox ] = useState(initialList)

    function onChangeText( text, id ){
        setListCheckBox( prev => prev.map( item =>(
            item.id === id 
                ? {
                    ...item,
                    text: text 
                } : item
        )))
    }
 
    function onCheck(id){
        setListCheckBox( prev => prev.map( item => (
            item.id === id 
                ? {
                    ...item,
                    checked: !item.checked
                } : item
        )))         
    }

    function newCheckBox(){
        Keyboard.dismiss()
        setListCheckBox( listCheckBox => listCheckBox.concat({
            id: countId + 1,
            checked: false,
            text: '' 
        }))
        setCountId( countId => countId + 1 )
    }

    async function onSubmit() {

        if(isNew === true){

            const data = { 
                type: 'list',
                title: title.value, 
                description: JSON.stringify(listCheckBox)  
            }

            await request('/saveNote', 'post', data)

            navigation.navigate('Notes')

        }else{

            const data = { 
                title: title.value, 
                description: JSON.stringify(listCheckBox)  
            }

            await request(`/updateNote/${id}`, 'post', data)

            navigation.navigate('Notes')

        }

    }
    
    return (
        <KeyboardAvoidingView behavior='height' keyboardVerticalOffset={145} enabled style={styles.container}>
            <View style={{width: '100%', height: '90%'}}>

                <ScrollView style={{width: '100%', height: '100%'}}>
                    <View style={{width: '100%', height: '100%'}}>
                    <TextInput textAlignVertical='top' multiline {...title} style={styles.title} placeholder='Title' placeholderTextColor='#c3c3c380' />

                    {
                        listCheckBox.map((item)=>(
                            <TouchableOpacity onLongPress={()=>console.log('llega')} style={styles.CheckBoxContainer} key={item.id}>
                                <CheckBox containerStyle={{marginLeft: -2}} size={25} onPress={()=>onCheck(item.id)} checked={item.checked}/>
                                <TextInput maxLength={90} scrollEnabled={false} textAlignVertical='top' onChangeText={(text)=>onChangeText(text ,item.id)} value={item.text} style={styles.text} placeholder='Text'  placeholderTextColor='#c3c3c380' multiline />
                            </TouchableOpacity>
                        ))
                    }
                    </View>
                </ScrollView>


                <TouchableOpacity onPress={onSubmit} style={styles.saveButton}>
                    <Text style={{color: '#222f3e', fontWeight: 'bold'}}>Save</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={newCheckBox} style={styles.add}>
                    <Text style={{fontSize:20, color: '#222f3e', fontWeight: 'bold'}}>+</Text>
                </TouchableOpacity>

            </View>
        </KeyboardAvoidingView>

    )
}

const styles = StyleSheet.create({

    container: {
        width: '100%',
        flex: 1,
        height: '100%'
    },

    title: { 
        paddingBottom: 10,
        width: '70%',
        paddingTop: 10,
        marginLeft: 6,
        color: '#c3c3c3',
        fontWeight: 'bold', 
        fontSize: 22
    },

    CheckBoxContainer: {
        width: '75%',
        flexWrap: 'wrap',
        flexDirection: 'row'
    },

    text: {
        fontSize: 16,
        width: '75%',
        color: '#c3c3c3',
        marginLeft: -15,
        marginTop: 13,
    },

    saveButton: {
        position: 'absolute', 
        top: 10, 
        right: 10, 
        padding: 10, 
        borderRadius: 100, 
        backgroundColor: '#d09950',
        width: 60, 
        height: 60, 
        alignItems: 'center', 
        justifyContent: 'center',

        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 6,
        shadowColor: 'black'
    },

    add: {
        position: 'absolute', 
        top: 80, 
        right: 10, 
        padding: 10, 
        borderRadius: 100, 
        backgroundColor: '#c3c3c3',
        width: 60, 
        height: 60, 
        alignItems: 'center', 
        justifyContent: 'center',

        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 6,
        shadowColor: 'black'
    }

})

export default FormTicks
