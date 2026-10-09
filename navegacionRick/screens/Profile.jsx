import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { colores, estadoInfo, sombra } from '../theme/colores';

export default function Profile({ route, navigation }) {
  const { name, image, status, species, gender, origin, location, episode } = route.params;
  const estado = estadoInfo(status);

  function goBack() {
    navigation.goBack();
  }

  const datos = [
    { id: 1, etiqueta: 'Especie', valor: species },
    { id: 2, etiqueta: 'Genero', valor: gender },
    { id: 3, etiqueta: 'Origen', valor: origin.name },
    { id: 4, etiqueta: 'Ultima ubicacion', valor: location.name },
    { id: 5, etiqueta: 'Episodios', valor: episode.length.toString() },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contenido}>
      <View style={styles.cabecera}>
        <Image source={{ uri: image }} style={styles.imagen} />
      </View>

      <View style={styles.titulos}>
        <Text style={styles.nombre}>{name}</Text>
        <View style={[styles.estado, { backgroundColor: estado.color }]}>
          <Text style={styles.estadoTexto}>{estado.texto}</Text>
        </View>
      </View>

      <View style={styles.caja}>
        {datos.map((dato, index) => (
          <View key={dato.id} style={[styles.fila, index === datos.length - 1 && styles.ultimaFila]}>
            <Text style={styles.etiqueta}>{dato.etiqueta}</Text>
            <Text style={styles.valor}>{dato.valor}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.boton} onPress={goBack}>
        <Text style={styles.botonTexto}>Volver a la lista</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colores.fondo,
  },
  contenido: {
    paddingBottom: 30,
  },
  cabecera: {
    backgroundColor: colores.rick,
    alignItems: 'center',
    paddingVertical: 28,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  imagen: {
    width: 230,
    height: 230,
    borderRadius: 115,
    borderWidth: 6,
    borderColor: colores.blanco,
  },
  titulos: {
    alignItems: 'center',
    marginTop: 18,
    gap: 10,
  },
  nombre: {
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: -0.6,
    color: colores.tinta,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  estado: {
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 14,
  },
  estadoTexto: {
    color: colores.blanco,
    fontWeight: '700',
  },
  caja: {
    backgroundColor: colores.blanco,
    marginHorizontal: 18,
    marginTop: 22,
    borderRadius: 22,
    paddingHorizontal: 18,
    ...sombra,
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colores.borde,
    gap: 16,
  },
  ultimaFila: {
    borderBottomWidth: 0,
  },
  etiqueta: {
    color: colores.tintaSuave,
  },
  valor: {
    flexShrink: 1,
    textAlign: 'right',
    fontWeight: '700',
    color: colores.tinta,
  },
  boton: {
    alignSelf: 'center',
    marginTop: 22,
    backgroundColor: colores.tinta,
    paddingHorizontal: 26,
    paddingVertical: 13,
    borderRadius: 18,
  },
  botonTexto: {
    color: colores.blanco,
    fontWeight: '800',
  },
});
