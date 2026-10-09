import { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import Cargando from '../components/cargando';
import { getPersonajesPorUrls } from '../services/api';
import { colores } from '../theme/colores';

export default function EpisodeDetail({ route }) {
  const { name, episode, air_date, characters } = route.params;

  const [personajes, setPersonajes] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarPersonajes();
  }, []);

  async function cargarPersonajes() {
    const data = await getPersonajesPorUrls(characters);
    setPersonajes(data);
    setCargando(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.cabecera}>
        <View style={styles.insignia}>
          <Text style={styles.codigo}>{episode}</Text>
        </View>
        <Text style={styles.nombre}>{name}</Text>
        <Text style={styles.fecha}>Estreno: {air_date}</Text>
      </View>

      <Text style={styles.subtitulo}>Personajes ({characters.length})</Text>

      {cargando ? (
        <Cargando />
      ) : (
        <FlatList
          data={personajes}
          keyExtractor={item => item.id.toString()}
          numColumns={3}
          contentContainerStyle={styles.lista}
          renderItem={({ item }) => (
            <View style={styles.personaje}>
              <Image source={{ uri: item.image }} style={styles.imagen} />
              <Text style={styles.textoPersonaje} numberOfLines={1}>{item.name}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colores.fondo,
  },
  cabecera: {
    backgroundColor: colores.rick,
    padding: 22,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
  },
  insignia: {
    alignSelf: 'flex-start',
    backgroundColor: colores.morty,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 14,
    marginBottom: 12,
  },
  codigo: {
    fontWeight: '900',
    color: colores.tinta,
  },
  nombre: {
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.6,
    color: colores.tinta,
  },
  fecha: {
    color: colores.tinta,
    opacity: 0.7,
    marginTop: 4,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: '800',
    color: colores.tinta,
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 8,
  },
  lista: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  personaje: {
    flex: 1 / 3,
    alignItems: 'center',
    marginBottom: 14,
  },
  imagen: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 3,
    borderColor: colores.blanco,
    backgroundColor: colores.rick,
  },
  textoPersonaje: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 6,
    width: 92,
    textAlign: 'center',
    color: colores.tinta,
  },
});
