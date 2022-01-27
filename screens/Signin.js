import React, { useEffect } from 'react'
import { Alert, View, Text, ImageBackground, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { request } from '../api'
import { useFormValues } from '../hooks/useFormValues'
import bgImage from '../Img/backgroundSignin.png'
import logo from '../Img/logo.png'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { connect } from 'react-redux'
import { login } from '../store/authenticated/actions'

const Signin = ({ navigation, login }) => {

    useEffect(()=>{
        AsyncStorage.getItem('token').then((token) => {
            
            if(token){
                login()
                navigation.navigate('Notes')
            }
        })
    },[])

    const email = useFormValues()
    const password = useFormValues()

    async function onSubmit(){

        const data = {email: email.value, password: password.value}

        const user = await request('/login', 'post', data)

        if(user.error){ return Alert.alert('Error', user.error, [{text: 'OK'}]) } else {

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


                <Text style={styles.signupTitles} >Sign In</Text>

                <View style={{width: '100%'}}>

                    <TextInput maxLength={30} {...email} style={styles.inputsForm} placeholder='Email' placeholderTextColor='#c3c3c380' />
                    
                    <TextInput secureTextEntry={true} maxLength={16} {...password} style={styles.inputsForm} placeholder='Password' placeholderTextColor='#c3c3c380' />

                    <TouchableOpacity onPress={onSubmit} style={styles.signinButton}>
                        <Text> Sign In → </Text>
                    </TouchableOpacity>


                    <Text style={styles.textNewAccount}> If you don't have Account </Text>

                    <View style={{alignSelf: 'center'}}>
                        <TouchableOpacity onPress={()=>navigation.navigate('Signup')} style={{alignSelf: 'flex-start'}}>
                            <Text style={styles.buttonNewAccount}> Sign Up </Text>
                        </TouchableOpacity> 
                    </View>

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

    signinButton: {
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

    textNewAccount: {
        alignSelf: 'center',
        marginTop: 25,
        color: '#c3c3c3',
    },

    buttonNewAccount: {
        alignSelf: 'center',
        color: '#d09950',
        fontWeight: 'bold',
        fontSize: 18
    }

})

export default connect(null, { login })(Signin) 
