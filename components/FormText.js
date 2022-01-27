import React from 'react';
import { View, TextInput, StyleSheet, KeyboardAvoidingView, Text, TouchableOpacity } from 'react-native'
import { useFormValues } from '../hooks/useFormValues'
import { useNavigation } from '@react-navigation/native'
import { request } from '../api'


const FormText = ( { isNew, initialTitle, initialDescription, id } ) => {

    const navigation = useNavigation()

    async function onSubmit(){

        if(isNew === true){

            const data = { 
                type: 'text',
                title: title.value, 
                description: description.value,  
            }

            await request('/saveNote', 'post', data)

            navigation.navigate('Notes')

        }else{

            const data = { 
                title: title.value, 
                description: description.value,  
            }

            await request(`/updateNote/${id}`, 'post', data)

            navigation.navigate('Notes')

        }

    }

    const title = useFormValues(initialTitle)
    const description = useFormValues(initialDescription)

    return (
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={40} enabled style={styles.container}>
            <View style={{width: '100%', height: '100%'}}>
                <TextInput maxLength={50} scrollEnabled={false} textAlignVertical='top' multiline {...title} style={styles.title} placeholder='Title' placeholderTextColor='#c3c3c380' />
                <TextInput textAlignVertical='top' multiline {...description} style={styles.description} placeholder='Description' placeholderTextColor='#c3c3c380' />
            </View>
            <TouchableOpacity onPress={onSubmit} style={styles.saveButton}>
                <Text style={{color: '#222f3e', fontWeight: 'bold'}}>Save</Text>
            </TouchableOpacity>
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
        width: '75%',
        paddingBottom: 15,
        marginTop: 20,
        maxHeight: '40%',
        color: '#c3c3c3',
        fontWeight: 'bold', 
        fontSize: 22
    },

    description: {
        maxHeight: '60%',
        color: '#c3c3c3',
        fontSize: 18,
        width: '100%',
        marginBottom: 20,
        marginTop: 5
    },

    saveButton: {
        position: 'absolute', 
        top: 8, 
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
    }

})

export default FormText
