import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from './ThemeContext'; // Importar ThemeContext
import FullScreenMenu from './FullScreenMenu'; // Importar el menú lateral
import BottomNav from './BottomNav'; // Importar la barra de navegación


const AsistenciaPorMateria = ({ navigation }) => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={styles.header}>
        <Text style={[styles.headerText, isDarkMode && styles.darkHeaderText]}>
          Asistencia por Materia
        </Text>
      </View>
      <View style={styles.content}>
        {/* Aquí puedes agregar la lógica y componentes que necesites para mostrar la asistencia por materia */}
        <Text style={[styles.text, isDarkMode && styles.darkText]}>
          Aquí se mostrará la asistencia de los estudiantes por materia.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#000',
  },
  header: {
    padding: 20,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  darkHeaderText: {
    color: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
});

export default AsistenciaPorMateria;

