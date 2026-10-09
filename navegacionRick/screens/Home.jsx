import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import Cargando from '../components/cargando';
import TarjetaPersonaje from '../components/TarjetaPersonaje';
import NotFound from './NotFound';
import { getPersonajes } from '../services/api';
import { colores } from '../theme/colores';

const nombresFiltro = {
  alive: 'Vivos',
  dead: 'Muertos',
  unknown: 'Desconocidos',
};

export default function Home({ navigation, route }) {
  // El filtro de estado llega desde el Drawer (alive, dead, unknown)
  const status = route.params?.status ?? '';

  const [personajes, setPersonajes] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [hayMas, setHayMas] = useState(true);
  const [cargando, setCargando] = useState(true);
  const [buscar, setBuscar] = useState('');

  useEffect(() => {
    cargarPrimeraPagina();
  }, [status, buscar]);

  async function cargarPrimeraPagina() {
    setCargando(true);
    const data = await getPersonajes(1, status, buscar);
    setPersonajes(data.results);
    setPagina(1);
    setHayMas(data.info.next !== null);
    setCargando(false);
  }

  async function cargarMas() {
    if (!hayMas || cargando) return;
    const siguiente = pagina + 1;
    const data = await getPersonajes(siguiente, status, buscar);
    setPersonajes([...personajes, ...data.results]);
    setPagina(siguiente);
    setHayMas(data.info.next !== null);
  }

  function goToDetalle(personaje) {
    navigation.navigate('DetallePersonaje', { ...personaje });
  }

  function quitarFiltro() {
    navigation.setParams({ status: '' });
  }

  return (
    <View style={styles.container}>
      <View style={styles.encabezado}>
        <Text style={styles.titulo}>Personajes</Text>

        <View style={styles.buscador}>
          <Feather name="search" size={18} color={colores.tintaSuave} />
          <TextInput
            style={styles.input}
            placeholder="Buscar por nombre"
            placeholderTextColor={colores.tintaSuave}
            value={buscar}
            onChangeText={setBuscar}
          />
        </View>

        {status !== '' && (
          <TouchableOpacity style={styles.chip} onPress={quitarFiltro}>
            <Text style={styles.chipTexto}>{nombresFiltro[status]}</Text>
            <Feather name="x" size={14} color={colores.tinta} />
          </TouchableOpacity>
        )}
      </View>

      {cargando ? (
        <Cargando />
      ) : (
        <FlatList
          data={personajes}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.lista}
          renderItem={({ item }) => (
            <TarjetaPersonaje personaje={item} onPress={() => goToDetalle(item)} />
          )}
          onEndReached={cargarMas}
          onEndReachedThreshold={0.5}
          ListEmptyComponent={<NotFound mensaje="No hay personajes con ese nombre. Prueba con otra busqueda." />}
        />
      )}
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colores.fondo,
  },
  encabezado: {
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 8,
  },
  titulo: {
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -0.8,
    color: colores.tinta,
    marginBottom: 12,
  },
  buscador: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colores.blanco,
    borderRadius: 16,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: colores.borde,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: colores.tinta,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: colores.morty,
  },
  chipTexto: {
    fontWeight: '800',
    color: colores.tinta,
  },
  lista: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  vacio: {
    textAlign: 'center',
    marginTop: 40,
    marginHorizontal: 30,
    color: colores.tintaSuave,
  },
});
