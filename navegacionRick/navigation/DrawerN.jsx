import { createDrawerNavigator, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import TabNavigation from './TabNavigation';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import img from "../assets/favicon.png";
import { useState } from 'react';
import { colores } from '../theme/colores';

const Drawer = createDrawerNavigator();

const filtros = [
  { id: 1, nombre: "Todos", status: "" },
  { id: 2, nombre: "Vivos", status: "alive" },
  { id: 3, nombre: "Muertos", status: "dead" },
  { id: 4, nombre: "Desconocidos", status: "unknown" }
];

function DrawerPersonalizado(props) {
    const [usuario, setUsuario] = useState({
        id: 1,
        nombre: "Sneyder Vergel",
        email: "svergel@ucompensar.edu.co"
    });
    const [filtroActivo, setFiltroActivo] = useState("");

    // Navega a Inicio > Personajes > ListaPersonajes pasando el filtro
    function goToFiltro(status) {
        setFiltroActivo(status);
        props.navigation.navigate('Home', {
            screen: 'Personajes',
            params: {
                screen: 'ListaPersonajes',
                params: { status: status },
            },
        });
    }

    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
            <View style={{
                backgroundColor: colores.portal,
                paddingTop: 56,
                paddingBottom: 22,
                paddingHorizontal: 20,
                borderBottomRightRadius: 36,
                marginBottom: 12,
            }}>
                <Image
                    source={img}
                    style={{
                        width: 84,
                        height: 84,
                        borderRadius: 42,
                        borderWidth: 4,
                        borderColor: colores.blanco,
                        backgroundColor: colores.morty,
                    }}
                />
                <Text style={{ fontSize: 22, fontWeight: '900', color: colores.tinta, marginTop: 12 }}>
                    {usuario.nombre}
                </Text>
                <Text style={{ color: colores.tinta, opacity: 0.75 }}>
                    {usuario.email}
                </Text>
            </View>

            <DrawerItemList {...props} />

            <View style={{ paddingHorizontal: 20, paddingTop: 22, paddingBottom: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: '800', color: colores.tinta }}>Filtrar personajes</Text>
            </View>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, gap: 8 }}>
                {filtros.map(item => {
                    const activo = filtroActivo === item.status;
                    return (
                        <TouchableOpacity
                            key={item.id}
                            onPress={() => goToFiltro(item.status)}
                            style={{
                                paddingHorizontal: 14,
                                paddingVertical: 8,
                                borderRadius: 16,
                                backgroundColor: activo ? colores.tinta : colores.blanco,
                                borderWidth: 1,
                                borderColor: activo ? colores.tinta : colores.borde,
                            }}
                        >
                            <Text style={{ fontWeight: '700', color: activo ? colores.blanco : colores.tinta }}>
                                {item.nombre}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </DrawerContentScrollView>
    );
}


export default function DrawerN() {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <DrawerPersonalizado {...props} />}
            screenOptions={{
                drawerActiveTintColor: colores.tinta,
                drawerInactiveTintColor: colores.tintaSuave,
                drawerActiveBackgroundColor: colores.rick,
                drawerLabelStyle: { fontWeight: '700' },
                drawerStyle: { backgroundColor: colores.fondo, width: 300 },
                drawerHideStatusBarOnOpen: true,
                headerStyle: { backgroundColor: colores.fondo, elevation: 0, shadowOpacity: 0 },
                headerTintColor: colores.tinta,
                headerTitleStyle: { fontWeight: '900' },
            }}
        >
            <Drawer.Screen
                name="Home"
                component={TabNavigation}
                options={{
                    drawerLabel: "Inicio",
                    title: 'navegacionRick',
                    drawerIcon: ({color}) => <MaterialCommunityIcons name="monitor-dashboard" size={24} color={color} />
                }}
            />
        </Drawer.Navigator>
    );
}
