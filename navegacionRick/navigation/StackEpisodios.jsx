import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Updates from '../screens/Updates';
import EpisodeDetail from '../screens/EpisodeDetail';
import { colores } from '../theme/colores';

const stack = createStackNavigator();

const StackEpisodios = () => {
  return (
   <stack.Navigator
      initialRouteName="ListaEpisodios"
      screenOptions={{
        headerStyle: { backgroundColor: colores.rick, elevation: 0, shadowOpacity: 0 },
        headerTintColor: colores.tinta,
        headerTitleStyle: { fontWeight: '800' },
      }}
   >
        <stack.Screen name="ListaEpisodios" component={Updates} options={{headerShown: false}} />
        <stack.Screen name="DetalleEpisodio" component={EpisodeDetail} options={{title: 'Episodio'}}/>
   </stack.Navigator>
  )
}

export default StackEpisodios
