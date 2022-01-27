import React from 'react'
import { Alert, View, Text, ImageBackground, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useFormValues } from '../hooks/useFormValues'
import { request } from '../api'
import { connect } from 'react-redux'
import { login } from '../store/authenticated/actions'
import AsyncStorage from '@react-native-async-storage/async-storage'
import bgImage from '../Img/backgroundSignup.png'

import logo from '../Img/logo.png'

const Signup = ({ navigation, login }) => {

    const email = useFormValues()
    const password = useFormValues()
    const repeatPassword = useFormValues()

    async function onSubmit(){

        const data = {email: email.value, password: password.value}

        if(password.value === repeatPassword.value){}else{ return Alert.alert('Error', 'The passwords dont match', 'OK') }

        const user = await request('/signup', 'post', data)

        if(user.error){ return Alert.alert('Error', user.error, 'OK') } else {

            await AsyncStorage.setItem('token', JSON.stringify(user.token) )

            login()

            navigation.navigate('Notes')

        }

    }

    return (
        <ImageBackground source={bgImage} style={styles.bgContainer}>
            <View style={styles.container}>
            <KeyboardAwareScrollView style={{width: '100%', padding: 20}} contentContainerStyle={{alignItems: 'center'}}>
                <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>Notes Hub</Text>
                    <Image style={{width: 30, height: 30}} source={logo} />
                </View>


                <Text style={styles.signupTitles} >Sign Up</Text>

                <View style={{width: '100%'}}>

                    <TextInput maxLength={30} {...email} style={styles.inputsForm} placeholder='Email' placeholderTextColor='#c3c3c380' />
                    
                    <TextInput maxLength={16} secureTextEntry={true} {...password} style={styles.inputsForm} placeholder='Password' placeholderTextColor='#c3c3c380' />
                    
                    <TextInput maxLength={16} secureTextEntry={true} {...repeatPassword} style={styles.inputsForm} placeholder='Repeat Password' placeholderTextColor='#c3c3c380' />

                    <TouchableOpacity onPress={onSubmit} style={styles.signupButton}>
                        <Text> Sign Up → </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={()=>navigation.navigate('Signin')} style={styles.backButton}>
                        <Text style={{color: '#d09950'}} > ← Back </Text>
                    </TouchableOpacity>

                </View>
            </KeyboardAwareScrollView>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({

    bgContainer: {
        flex: 1, 
        width: '100%', 
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    container: {
        backgroundColor: '#1a222bdb',
        width: '90%',
        paddingBottom: 22,
        alignItems: 'center',
        borderRadius: 20
    },

    logoContainer: {
        flexDirection: 'row', 
        marginBottom: 15, 
        justifyContent: 'center', 
        alignItems: 'center'
    },

    logoText: {
        fontSize: 25, 
        fontWeight: 'bold',
        color: '#d09950',
        marginRight: 8
    },

    signupTitles: {
        fontSize: 25, 
        fontWeight: 'bold',
        color: '#c3c3c3',
        marginBottom: 20
    },

    inputsForm: {
        width: '100%',
        padding: 10,
        color: '#c3c3c3',
        backgroundColor: '#222f3e',
        marginVertical: 10,
        borderRadius: 20
    },

    signupButton: {
        alignItems: 'center',
        backgroundColor: '#d09950',
        borderRadius: 20, 
        padding: 15,
        marginTop: 10,

        shadowOffset: { width: 5, height:-4 },
        shadowOpacity: 1,
        shadowRadius: 6,
        shadowColor: 'black'
    },

    backButton: {
        marginTop: 20,
        padding: 15,
        alignItems: 'center',
        backgroundColor: '#222f3e',
        borderRadius: 20, 

        shadowOffset: { width: -5, height:-4 },
        shadowOpacity: 1,
        shadowRadius: 6,
        shadowColor: 'black'
    }

})

export default connect(null, { login })(Signup)