import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import DrawerN from './navigation/DrawerN';
import { colores } from './theme/colores';

const tema = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colores.fondo,
    primary: colores.portalOscuro,
    card: colores.fondo,
    text: colores.tinta,
    border: colores.borde,
  },
};

export default function App() {
  return (

    <NavigationContainer theme={tema}>
      <DrawerN/>
    </NavigationContainer>

  );
}
