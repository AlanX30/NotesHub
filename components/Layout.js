import React from 'react'
import {  SafeAreaView, StyleSheet, StatusBar, TouchableWithoutFeedback, Keyboard } from 'react-native'

const Layout = ({children}) => {
    return (
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#222f3e' />
                {children}
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#222f3e',
        padding: 10,
        paddingBottom: 0,
        paddingHorizontal: 5,
        height: '100%',
        flex: 1,
        alignItems: 'center'
    }
})

export default Layout
