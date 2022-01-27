import React, { useState, useEffect } from 'react'
import Layout  from '../components/Layout'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

import FormText  from '../components/FormText'
import FormTicks  from '../components/FormTicks'

const NoteForm = ({ navigation, route }) => {

    const [modeNote, setModeNote] = useState('')

    let [isNew, setIsNew] = useState(false)

    let [ initialTitle, setInitialTitle ] = useState('')
    let [ initialDescription, setInitialDescription ] = useState('')
    
    let [ listTicks, setListTisks ] = useState([
        {
            id: 1,
            checked: false,
            text: '' 
        }
    ])

    useEffect(()=>{

        if(route.params && route.params.new){ setIsNew(true) }else{
            if(route.params && route.params.note.title) { setInitialTitle(route.params.note.title)}
            if(route.params && route.params.note.title) { setInitialDescription(route.params.note.description)}
            if(route.params && route.params.note.type) { setModeNote(route.params.note.type) }
            if(route.params && route.params.list) { setListTisks(route.params.list) }
        }

    },[])

    if(isNew){

        return (
            <Layout>
                {
                    modeNote === '' ?
                        <View style={styles.typeNoteContainer}>
                            <TouchableOpacity onPress={()=>setModeNote('text')} style={styles.button}><Text style={styles.textButtons}>Type Text</Text></TouchableOpacity>
                            <TouchableOpacity onPress={()=>setModeNote('ticks')} style={styles.button}><Text style={styles.textButtons}>Type List</Text></TouchableOpacity>
                        </View>
                    : modeNote === 'text' ?
                        <FormText isNew={true} initialTitle={initialTitle} initialDescription={initialDescription} />
                    : modeNote === 'ticks' && 
                        <FormTicks isNew={true} initialTitle={initialTitle} initialList={listTicks} />
                }


            </Layout>
        )

    }else{
        
        return (
            <Layout>

                {
                    modeNote === 'text' ?
                        <FormText isNew={false} id={route.params.note.id} initialTitle={initialTitle} initialDescription={initialDescription} /> 
                    : modeNote === 'list' &&
                        <FormTicks isNew={false} id={route.params.note.id} initialTitle={initialTitle} initialList={listTicks} />
                }

            </Layout>
        )

    }


}

const styles = StyleSheet.create({

    typeNoteContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: 30
    },

    button: {
        backgroundColor: '#1a222b',
        padding: 15,
        paddingHorizontal: 50,
        marginBottom: 30,
        borderRadius: 20,
        shadowOffset: { width: 0, height:4 },
        shadowOpacity: 2,
        shadowRadius: 5,
        shadowColor: '#1a222b',
    },

    textButtons: {
        color: '#c3c3c3',
        fontWeight: 'bold',
        fontSize: 16
    }

})



export default NoteForm
