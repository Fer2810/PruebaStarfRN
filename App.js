import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from './ThemeContext'; // Importar ThemeContext
import SplashScreen from './SplashScreen';
import HomeScreen from './HomeScreen';
import AdminScreen from './AdminScreen';
import ProfesorScreen from './ProfesorScreen';
import WelcomeAdminScreen from './WelcomeAdminScreen';
import WelcomeProfesorScreen from './WelcomeProfesorScreen';
import PresentesScreen from './PresentesScreen';
import JustificacionAsistencia from './JustificacionAsistencia';
import FullScreenMenu from './FullScreenMenu'; // Importar FullScreenMenu
import AsistenciaPorMateria from './AsistenciaPorMateria';
import ListaEstudiantes from './ListaEstudiantes'; // Importar ListaEstudiantes

const Stack = createStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen">
          <Stack.Screen 
            name="SplashScreen" 
            component={SplashScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="HomeScreen" 
            component={HomeScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="AdminScreen" 
            component={AdminScreen} 
          />
          <Stack.Screen 
            name="ProfesorScreen" 
            component={ProfesorScreen} 
          />
          <Stack.Screen 
            name="WelcomeAdminScreen" 
            component={WelcomeAdminScreen} 
          />
          <Stack.Screen 
            name="WelcomeProfesorScreen" 
            component={WelcomeProfesorScreen} 
          />
          <Stack.Screen 
            name="PresentesScreen" 
            component={PresentesScreen} 
          />
          <Stack.Screen 
            name="FullScreenMenu" 
            component={FullScreenMenu} // Añadir FullScreenMenu al Stack
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="JustificacionAsistencia" 
            component={JustificacionAsistencia} 
          />
          <Stack.Screen 
            name="AsistenciaPorMateria" 
            component={AsistenciaPorMateria} 
          />
          <Stack.Screen 
            name="ListaEstudiantes" 
            component={ListaEstudiantes}  // Añadir ListaEstudiantes al Stack
          />
      </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
