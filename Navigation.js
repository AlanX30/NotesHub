import React from 'react';
import { Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { connect } from 'react-redux';

import Home from './screens/Home'
import NoteForm from './screens/NoteForm'
import Signin from './screens/Signin'
import Signup from './screens/Signup'

const Stack = createNativeStackNavigator()

const Navigation = ({isAuth}) => {

    return (
        <NavigationContainer>

            {
                isAuth ? 
                    <Stack.Navigator>
                        <Stack.Screen name='Notes' component={Home} options={optionsNotes} />
                        <Stack.Screen name='Edit Note' component={NoteForm} options={optionsEdit} />
                    </Stack.Navigator>
                : 
                    <Stack.Navigator>
                        <Stack.Screen name='Signin' component={Signin} options={{ headerShown: false }}/>

                        <Stack.Screen name='Signup' component={Signup} options={{ headerShown: false }}/>
                    </Stack.Navigator>
        
            }

        </NavigationContainer>
    )
}

const optionsNotes = ()=>({
    headerStyle: { backgroundColor: '#222f3e'},
    headerTitleStyle: { color: '#c3c3c3'},
})

  
const optionsEdit = ({navigation}) => ({
    headerTitle: ()=>(
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()} >
          <Text style={{backgroundColor: '#222f3e', color: '#c3c3c3', fontWeight: 'bold', fontSize:16, marginHorizontal: 40}}>
            Edit Note
          </Text>
        </TouchableWithoutFeedback>
    ),
    headerStyle: { backgroundColor: '#222f3e'},
    headerTitleStyle: { color: '#c3c3c3'},
    headerBackVisible: false,
    headerLeft: ()=>(
        <TouchableOpacity style={{flexDirection: 'row', height: '100%', alignItems: 'center'}} onPress={()=>navigation.navigate('Notes')}>
          <Text style={{marginRight: 4, marginBottom: 3, fontSize: 20, fontWeight: 'bold', color: '#c3c3c3'}} >←</Text>
          <Text style={{fontSize: 15, fontWeight: 'bold', color: '#c3c3c3'}}>Back</Text>
        </TouchableOpacity>
    ),
})
  
const mapStateToProps = state => ({
    isAuth: state.authReducer.isAuth
})

export default connect(mapStateToProps, null)(Navigation);
