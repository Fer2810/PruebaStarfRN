import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from './ThemeContext'; // Importar ThemeContext
import FullScreenMenu from './FullScreenMenu'; // Importar el menú lateral
import BottomNav from './BottomNav'; // Importar la barra de navegación

const WelcomeProfesorScreen = ({ navigation }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const [selectedIndex, setSelectedIndex] = useState(1); // El índice para la barra de navegación
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const handleItemTapped = (index) => {
    setSelectedIndex(index);
    // Aquí puedes añadir navegación o funcionalidad específica para cada botón
  };

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => navigation.navigate('FullScreenMenu')} // Navegar al menú lateral
          style={styles.menuButton}
        >
          <Icon name="menu" size={30} color={isDarkMode ? 'white' : 'black'} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={[styles.welcomeText, isDarkMode && styles.darkText]}>
          Bienvenido Profesor
        </Text>
        {/* Cuadro sin funcionalidad */}
        <TouchableOpacity
          style={[styles.button, isDarkMode && styles.darkButton, { width: screenWidth * 0.8, height: screenHeight * 0.2 }]}
          onPress={() => navigation.navigate('AsistenciaPorMateria')}
        >
          <Image
            source={require('./assets/opa.png')}
            style={styles.buttonImage}
          />
          <Text style={[styles.buttonText, isDarkMode && styles.darkButtonText]}>Asistencia Por Materia</Text>
        </TouchableOpacity>
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
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  menuButton: {
    padding: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
  button: {
    marginVertical: 20, // Ajuste del margen vertical
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
    borderRadius: 10,
  },
  darkButton: {
    backgroundColor: '#056347',
  },
  buttonImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  darkButtonText: {
    color: '#fff',
  },
  navBarContainer: {
    width: '100%', // Asegurar que la barra de navegación ocupe todo el ancho
    position: 'absolute',
    bottom: 0, // Posicionar la barra de navegación en la parte inferior
  },
});

export default WelcomeProfesorScreen;
