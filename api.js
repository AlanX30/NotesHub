import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'

const url = 'http://192.168.0.15:8080'


export const request = async(route, method, inf) =>{
    
    try {

        const storageToken = await AsyncStorage.getItem('token')

        const token = JSON.parse(storageToken)

        const request = await axios({
            method: method,
            data: inf,
            url: `${url}${route}`,
            headers: { 
                authorization: token
            }
        })       
        
        const data = await request.data
    
        return data

    }catch(error){
        Alert.alert('Error', error, 'OK')
    }

}