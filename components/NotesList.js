import React, { useEffect, useState } from 'react'
import { Alert, View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { request } from '../api'
import { useNavigation, useIsFocused } from '@react-navigation/native'

import NoteItem from './NoteItem'

const NotesList = () => {

    const [ notesList, setNotesList ] = useState([])

    const navigation = useNavigation()
    const focused = useIsFocused()

    useEffect(async () => {

        if(focused) {
            const notes = await request('/notes', 'get')

            if(notes.error){
                Alert.alert('Error', 'Internal Error', 'OK')
                navigation.navigate('Signin')
            }

            setNotesList(notes)
        }
    
    },[focused])

    if(notesList === []){ return ( <View><Text>Lista no cargada</Text></View> ) }

    return (
        
        notesList.length === 0 ?

        <View style={styles.noNotesContainer}>
            <Text style={{color: '#c3c3c3', marginBottom: 20, fontWeight: 'bold'}}>You don't have any notes</Text>
            <TouchableOpacity onPress={()=>(navigation.navigate('Edit Note', { new:true }))} style={styles.buttonNewNote}>
                <Text style={{fontSize: 18, fontWeight: 'bold', color: '#c3c3c3'}}>Create a new note  +</Text>
            </TouchableOpacity>
        </View> 
        : 
        <View style={{width: '100%', height:'90%'}}>
            <ScrollView style={{width: '100%', height: '100%'}}>
                <View style={styles.listContainer}>
                    <NoteItem note={notesList} />
                </View>     
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({

    noNotesContainer: {
        flex: 1, 
        width: '100%', 
        height: '80%', 
        alignItems: 'center', 
        marginTop: 50
    },

    buttonNewNote: {
        padding: 25,
        fontWeight: 'bold',
        backgroundColor: '#1a222b',
        borderRadius: 20,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 2,
        shadowRadius: 3,
        shadowColor: 'black'
    },

    listContainer: {
        width: '100%',
        flex: 1,
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        flexDirection: 'row'
    }
    
})

export default NotesList