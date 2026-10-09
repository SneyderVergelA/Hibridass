import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import Cargando from '../components/cargando';
import { getUbicaciones } from '../services/api';
import { colores, sombra } from '../theme/colores';

export default function Locations() {
  const [ubicaciones, setUbicaciones] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [hayMas, setHayMas] = useState(true);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarInicial();
  }, []);

  async function cargarInicial() {
    const data = await getUbicaciones(1);
    setUbicaciones(data.results);
    setHayMas(data.info.next !== null);
    setCargando(false);
  }

  async function cargarMas() {
    if (!hayMas) return;
    const siguiente = pagina + 1;
    const data = await getUbicaciones(siguiente);
    setUbicaciones([...ubicaciones, ...data.results]);
    setPagina(siguiente);
    setHayMas(data.info.next !== null);
  }

  if (cargando) {
    return <Cargando />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Ubicaciones</Text>

      <FlatList
        data={ubicaciones}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.icono}>
              <Entypo name="location-pin" size={26} color={colores.tinta} />
            </View>
            <View style={styles.textos}>
              <Text style={styles.nombre}>{item.name}</Text>
              <Text style={styles.detalle}>
                {item.type || 'Tipo desconocido'} - {item.dimension || 'Dimension desconocida'}
              </Text>
              <Text style={styles.residentes}>{item.residents.length} residentes</Text>
            </View>
          </View>
        )}
        onEndReached={cargarMas}
        onEndReachedThreshold={0.5}
      />
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colores.fondo,
  },
  titulo: {
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -0.8,
    color: colores.tinta,
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 10,
  },
  lista: {
    paddingHorizontal: 14,
    paddingBottom: 20,
  },
  item: {
    flexDirection: 'row',
    backgroundColor: colores.blanco,
    marginVertical: 6,
    padding: 14,
    borderRadius: 22,
    gap: 14,
    ...sombra,
  },
  icono: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colores.portal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textos: {
    flex: 1,
  },
  nombre: {
    fontSize: 16,
    fontWeight: '800',
    color: colores.tinta,
  },
  detalle: {
    color: colores.tintaSuave,
    marginTop: 3,
  },
  residentes: {
    marginTop: 6,
    fontWeight: '700',
    color: colores.portalOscuro,
  },
});
