import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ApolloProvider } from '@apollo/client'
import client from './Apollo'
import HomePage from './pages/HomePage'
import DetailPage from './pages/DetailPage'
import AuthPage from './pages/AuthPage'
import ProfilePage from './pages/ProfilePage'

const Stack = createNativeStackNavigator()

export default () => {
  return (
    <ApolloProvider client={client} >
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Auth'
          screenOptions={{
            headerTitleAlign: 'center',
            headerTintColor: 'black',
            headerTitle: 'OYLA!',
            headerTitleStyle: {
              fontSize: 28,
              fontWeight: 'bold'
            },
            headerStyle: {
              backgroundColor: '#e5e1dd'
            }
          }} >
          <Stack.Screen
            name='Home'
            component={HomePage}
          />
          <Stack.Screen
            name='Detail'
            component={DetailPage}
          />
          <Stack.Screen
            name='Profile'
            component={ProfilePage}
          />
          <Stack.Screen
            name='Auth'
            component={AuthPage}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  )
}