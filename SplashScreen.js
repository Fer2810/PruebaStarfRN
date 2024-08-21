import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Navegar a HomeScreen después de 5 segundos
    setTimeout(() => {
      navigation.replace('HomeScreen');
    }, 5000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.loadingText}>STARF</Text>
      <ActivityIndicator size="large" color="#ffffff" style={styles.activityIndicator} />
      <Text style={styles.loadingSubtitle}>Cargando...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  loadingText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  activityIndicator: {
    marginVertical: 20, // Espaciado entre el texto y el indicador de carga
  },
  loadingSubtitle: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10, // Espaciado entre el indicador de carga y el texto "Cargando..."
  },
});

export default SplashScreen;
