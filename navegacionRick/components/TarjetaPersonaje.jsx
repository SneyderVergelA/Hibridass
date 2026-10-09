import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { colores, estadoInfo, sombra } from '../theme/colores';

export default function TarjetaPersonaje({ personaje, onPress }) {
  const estado = estadoInfo(personaje.status);

  return (
    <TouchableOpacity style={styles.tarjeta} onPress={onPress} activeOpacity={0.85}>
      <Image source={{ uri: personaje.image }} style={styles.imagen} />

      <View style={[styles.estado, { backgroundColor: estado.color }]}>
        <Text style={styles.estadoTexto}>{estado.texto}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.nombre} numberOfLines={1}>{personaje.name}</Text>
        <Text style={styles.especie} numberOfLines={1}>{personaje.species}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    flex: 1,
    margin: 6,
    backgroundColor: colores.blanco,
    borderRadius: 22,
    overflow: 'hidden',
    ...sombra,
  },
  imagen: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: colores.rick,
  },
  estado: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  estadoTexto: {
    color: colores.blanco,
    fontSize: 12,
    fontWeight: '700',
  },
  info: {
    padding: 12,
  },
  nombre: {
    fontSize: 16,
    fontWeight: '800',
    color: colores.tinta,
  },
  especie: {
    color: colores.tintaSuave,
    marginTop: 2,
  },
});
