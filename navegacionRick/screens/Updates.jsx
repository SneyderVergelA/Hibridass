import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import Cargando from '../components/cargando';
import { getEpisodios } from '../services/api';
import { colores, sombra } from '../theme/colores';

export default function Updates({ navigation }) {
  const [episodios, setEpisodios] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [hayMas, setHayMas] = useState(true);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarInicial();
  }, []);

  async function cargarInicial() {
    const data = await getEpisodios(1);
    setEpisodios(data.results);
    setHayMas(data.info.next !== null);
    setCargando(false);
  }

  async function cargarMas() {
    if (!hayMas) return;
    const siguiente = pagina + 1;
    const data = await getEpisodios(siguiente);
    setEpisodios([...episodios, ...data.results]);
    setPagina(siguiente);
    setHayMas(data.info.next !== null);
  }

  function goToDetalle(episodio) {
    navigation.navigate('DetalleEpisodio', { ...episodio });
  }

  if (cargando) {
    return <Cargando />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Episodios</Text>

      <FlatList
        data={episodios}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => goToDetalle(item)} activeOpacity={0.85}>
            <View style={styles.insignia}>
              <Text style={styles.temporada}>{item.episode.slice(0, 3)}</Text>
              <Text style={styles.capitulo}>{item.episode.slice(3)}</Text>
            </View>
            <View style={styles.textos}>
              <Text style={styles.nombre} numberOfLines={2}>{item.name}</Text>
              <Text style={styles.fecha}>{item.air_date}</Text>
            </View>
          </TouchableOpacity>
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
    alignItems: 'center',
    backgroundColor: colores.blanco,
    marginVertical: 6,
    padding: 12,
    borderRadius: 22,
    gap: 14,
    ...sombra,
  },
  insignia: {
    width: 68,
    height: 68,
    borderRadius: 18,
    backgroundColor: colores.morty,
    alignItems: 'center',
    justifyContent: 'center',
  },
  temporada: {
    fontSize: 20,
    fontWeight: '900',
    color: colores.tinta,
  },
  capitulo: {
    fontSize: 14,
    fontWeight: '700',
    color: colores.tinta,
  },
  textos: {
    flex: 1,
  },
  nombre: {
    fontSize: 16,
    fontWeight: '800',
    color: colores.tinta,
  },
  fecha: {
    color: colores.tintaSuave,
    marginTop: 3,
  },
});
