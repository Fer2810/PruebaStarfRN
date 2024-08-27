import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProfesorScreen = () => {
  const [nombre, setNombre] = useState('');
  const [contraseña, setContraseña] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    fetch('http://192.168.5.85:5000/login/profesor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre: nombre,
        contraseña: contraseña,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Inicio de sesión exitoso') {
          Alert.alert('Éxito', 'Inicio de sesión como profesor exitoso');
          navigation.navigate('WelcomeProfesorScreen'); // Redirige a WelcomeProfesorScreen
        } else {
          Alert.alert('Error', 'Nombre o contraseña incorrectos');
        }
      })
      .catch((error) => {
        Alert.alert('Error', 'Hubo un problema con el servidor');
        console.error('Error:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Iniciar sesión como Profesor</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={contraseña}
        onChangeText={setContraseña}
        secureTextEntry
      />
      <Button title="Iniciar Sesión" onPress={handleLogin} />
    </View>
  );
};

const WelcomeProfesorScreen = () => {
  const navigation = useNavigation();

  const handleAttendance = () => {
    navigation.navigate('AttendanceScreen'); // Navega a la pantalla de asistencia (asegúrate de tener esta ruta configurada)
  };

  return (
    <View style={styles.welcomeContainer}>
      <Button
        title="Ingresar asistencia por materia"
        onPress={handleAttendance}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  titleText: {
    fontSize: 22,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default ProfesorScreen;
