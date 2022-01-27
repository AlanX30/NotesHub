import React from 'react'
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { CheckBox } from 'react-native-elements'


const NoteItem = ({note}) => {

    const navigation = useNavigation()

    return (

        note.map((note)=> {

            if(note.type === 'list') {

                const list = JSON.parse(note.description)

                return (
                    <TouchableOpacity style={styles.listItem} key={note.id} onPress={()=>navigation.navigate('Edit Note', { note, list })}>
                        <Text style={{color: '#c3c3c3', fontWeight: '800', fontSize: 16}}>{note.title.substr(0,20)}</Text>
                        <View>
                            {
                                list.map((item)=>(
                                    <View key={item.id} style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginLeft: -10}}>
                                        <CheckBox size={15} containerStyle={{padding:0}} checked={item.checked} />
                                        <Text style={{color: '#c3c3c3'}}>{item.text.substr(0, 9)}</Text>
                                    </View>
                                ))
                            }
                        </View>
                    </TouchableOpacity>
                )

            }else{
                return (
                    <TouchableOpacity style={styles.listItem} key={note.id} onPress={()=>navigation.navigate('Edit Note', { note })}>
                        <Text style={{color: '#c3c3c3', fontWeight: '800', fontSize: 16}}>{note.title}</Text>
                        <Text style={{color: '#a5a5a5'}}>{note.description}</Text>
                    </TouchableOpacity>   
                )  
            }
        })
    )
}

const styles = StyleSheet.create({
        
    listItem: {
        backgroundColor: '#1a222b',
        marginHorizontal: 3,
        marginVertical: 4,
        padding: 10,
        paddingBottom: 25,
        borderRadius: 5,
        minWidth: '47%',
        width: '47%',
        shadowOffset: { width: -5, height:4 },
        shadowOpacity: 2,
        shadowRadius: 5,
        shadowColor: '#1a222b',
        maxHeight: 150,
        overflow: 'hidden'
    }

})

export default NoteItem
