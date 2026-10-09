import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import { colores } from '../theme/colores';

const stack = createStackNavigator();

const StackPersonajes = () => {
  return (
   <stack.Navigator
      initialRouteName="ListaPersonajes"
      screenOptions={{
        headerStyle: { backgroundColor: colores.rick, elevation: 0, shadowOpacity: 0 },
        headerTintColor: colores.tinta,
        headerTitleStyle: { fontWeight: '800' },
      }}
   >
        <stack.Screen name="ListaPersonajes" component={Home} options={{headerShown: false}} />
        <stack.Screen name="DetallePersonaje" component={Profile} options={{title: 'Detalle'}}/>
   </stack.Navigator>
  )
}

export default StackPersonajes
