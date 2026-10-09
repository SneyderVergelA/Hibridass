// Paleta de navegacionRick: menta clara, tinta verde-azulada,
// verde del portal, azul del pelo de Rick y amarillo de la camisa de Morty
export const colores = {
  fondo: '#EAF6F1',
  blanco: '#FFFFFF',
  tinta: '#10292E',
  tintaSuave: '#5F7A7E',
  borde: '#D3E7DF',
  portal: '#6BD36E',
  portalOscuro: '#23813F',
  rick: '#B7E4F4',
  morty: '#FFD84A',
  vivo: '#23813F',
  muerto: '#D43B40',
  desconocido: '#6B7C7F',
};

// Devuelve el color y el texto en español para cada estado de la API
export function estadoInfo(status) {
  if (status === 'Alive') return { color: colores.vivo, texto: 'Vivo' };
  if (status === 'Dead') return { color: colores.muerto, texto: 'Muerto' };
  return { color: colores.desconocido, texto: 'Desconocido' };
}

export const sombra = {
  elevation: 3,
  shadowColor: '#10292E',
  shadowOpacity: 0.12,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 3 },
};
