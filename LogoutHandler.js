import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native';

const LogoutButton = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    // Aquí puedes agregar la lógica adicional para cerrar sesión.
    // Redirigir al usuario a la pantalla de inicio.
    navigation.replace('HomeScreen');
  };

  return (
    <Button title="Cerrar sesión" onPress={handleLogout} />
  );
};

export default LogoutButton;
