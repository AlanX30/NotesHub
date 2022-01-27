import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { logout } from '../store/authenticated/actions'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

const MenuDown = ({ logout }) => {

    const navigation = useNavigation()

    async function onLogout(){

        await AsyncStorage.removeItem('token')

        logout()

        navigation.navigate('Signin')

    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onLogout}>
                <Text style={styles.textLogout}>← Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{height:'100%', justifyContent: 'center'}} onPress={()=>navigation.navigate('Edit Note', {new:true})}>
                <Text style={styles.textNew}> New Note + </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        position: 'absolute',
        bottom: 0,
        height: 50,
        paddingHorizontal: 10,
        width: '100%',
        flex: 1,
        backgroundColor: '#0d1116',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },

    textLogout: {
        color: '#ab2b2b',
        fontWeight: 'bold',
    },

    textNew: {
        color: '#c3c3c3',
        fontWeight: 'bold',
    }

})

export default connect(null, { logout })(MenuDown)
