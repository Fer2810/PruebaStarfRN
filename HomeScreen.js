import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: 'https://img.freepik.com/fotos-premium/dispositivo-autenticacion-biometrica-tecnologia-reconocimiento-facial-aislado-sobre-fondo-blanco_1041587-1029.jpg' }} 
        style={styles.image} 
      />
      <Text style={styles.titleText}>Elije tu usuario</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AdminScreen')}
      >
        <MaterialIcons name="admin-panel-settings" size={24} color="white" />
        <Text style={styles.buttonText}>Administrador</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ProfesorScreen')}
      >
        <MaterialIcons name="school" size={24} color="white" />
        <Text style={styles.buttonText}>Profesor</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.2,
  },
  titleText: {
    fontSize: 20,
    marginBottom: 20,
    zIndex: 1,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 25,
    marginVertical: 18,
    width: 200,
    justifyContent: 'center',
    zIndex: 1,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
});

export default HomeScreen;
