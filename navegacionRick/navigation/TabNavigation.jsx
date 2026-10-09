import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import StackPersonajes from './StackPersonajes';
import StackEpisodios from './StackEpisodios';
import Locations from '../screens/Locations';
import Settings from '../screens/Settings';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { colores } from '../theme/colores';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Personajes"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colores.tinta,
        tabBarInactiveTintColor: colores.tintaSuave,
        tabBarActiveBackgroundColor: colores.portal,
        tabBarLabelStyle: { fontWeight: '700', fontSize: 12 },
        tabBarItemStyle: { borderRadius: 18, marginHorizontal: 8, marginVertical: 6 },
        tabBarStyle: {
          backgroundColor: colores.blanco,
          borderTopWidth: 0,
          height: 70,
          elevation: 12,
        },
      }}
    >
        <Tab.Screen name='Personajes' component={StackPersonajes} options={{tabBarIcon:({color})=> <Entypo name="users" size={22} color={color} />}}/>
        <Tab.Screen name='Episodios' component={StackEpisodios} options={{tabBarIcon:({color})=> <MaterialCommunityIcons name="television-classic" size={22} color={color} />}}/>
        <Tab.Screen name='Ubicaciones' component={Locations} options={{tabBarIcon:({color})=> <Entypo name="location-pin" size={22} color={color} />}}/>
        <Tab.Screen name='Ajustes' component={Settings} options={{tabBarIcon:({color})=> <Feather name="settings" size={22} color={color} />}}/>
    </Tab.Navigator>

  )
}

export default TabNavigation
