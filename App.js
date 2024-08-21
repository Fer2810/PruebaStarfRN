import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './SplashScreen';
import HomeScreen from './HomeScreen';
import AdminScreen from './AdminScreen';
import ProfesorScreen from './ProfesorScreen';
import WelcomeAdminScreen from './WelcomeAdminScreen';
import WelcomeProfesorScreen from './WelcomeProfesorScreen';
import PresentesScreen from './PresentesScreen'; // Asegúrate de que este archivo exista y esté bien importado

const Stack = createStackNavigator();

export default function App() {
  return (
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
