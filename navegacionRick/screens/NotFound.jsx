import { StyleSheet, Text, View } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { colores } from '../theme/colores';

export default function NotFound({ mensaje = 'No encontramos lo que buscas.' }) {
  return (
    <View style={styles.container}>
      <View style={styles.icono}>
        <Feather name="search" size={30} color={colores.tinta} />
      </View>
      <Text style={styles.titulo}>Sin resultados</Text>
      <Text style={styles.texto}>{mensaje}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 40,
    paddingHorizontal: 30,
  },
  icono: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colores.morty,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 20,
    fontWeight: '900',
    color: colores.tinta,
    marginTop: 14,
  },
  texto: {
    textAlign: 'center',
    color: colores.tintaSuave,
    marginTop: 6,
  },
});
