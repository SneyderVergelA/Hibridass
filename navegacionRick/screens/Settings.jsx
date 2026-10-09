import { useState } from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';
import { colores, sombra } from '../theme/colores';

export default function Settings() {
  const [notificaciones, setNotificaciones] = useState(true);
  const [soloVivos, setSoloVivos] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Ajustes</Text>
      <View style={styles.caja}>
        <View style={styles.fila}>
          <Text style={styles.texto}>Notificaciones</Text>
          <Switch
            value={notificaciones}
            onValueChange={setNotificaciones}
            trackColor={{ false: colores.borde, true: colores.portal }}
            thumbColor={colores.blanco}
          />
        </View>
        <View style={[styles.fila, styles.ultimaFila]}>
          <Text style={styles.texto}>Mostrar solo personajes vivos</Text>
          <Switch
            value={soloVivos}
            onValueChange={setSoloVivos}
            trackColor={{ false: colores.borde, true: colores.portal }}
            thumbColor={colores.blanco}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colores.fondo,
    padding: 20,
  },
  titulo: {
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -0.8,
    color: colores.tinta,
    marginBottom: 14,
  },
  caja: {
    backgroundColor: colores.blanco,
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
  },
  ultimaFila: {
    borderBottomWidth: 0,
  },
  texto: {
    color: colores.tinta,
    fontWeight: '600',
  },
});
