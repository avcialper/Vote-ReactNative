import { Button, NativeBaseProvider, useToast } from 'native-base'
import React from 'react'
import { View, Text } from 'react-native'
import auth from '@react-native-firebase/auth'
import { authErrors } from '../../authErrorMessages'

export default ({ navigation }) => {

    const toast = useToast()

    const signOut = () => {
        auth().signOut()
            .then(() => navigation.reset({
                index: 0,
                routes: [{ name: 'Auth' }]
            }))
            .catch((error) => toast.show({
                description: authErrors(error.code),
                placement: 'bottom'
            }))
    }

    return (
        <NativeBaseProvider>
            <View style={{
                flex: 1,
                backgroundColor: 'bisque',
                alignItems: 'center',
                justifyContent: 'center'
            }} >
                <Text style={{
                    color: 'black',
                    textAlign: 'center',
                    fontSize: 24,
                    fontWeight: 'bold',
                    margin: 16
                }} >Merhaba {'\n'} {auth().currentUser?.email} </Text>
                <Button onPress={signOut} >Çıkış Yap</Button>
            </View>
        </NativeBaseProvider>
    )
}