import React, { useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { ThemeContext } from './ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function FullScreenMenu({ navigation }) {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const screenWidth = Dimensions.get('window').width;

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.closeButton}
      >
        <Icon name="close" size={30} color={isDarkMode ? 'white' : 'black'} />
      </TouchableOpacity>
      <View style={styles.userInfo}>
        <Image
          source={{ uri: 'https://example.com/user-photo.jpg' }} // Reemplaza con la URL de la foto del usuario
          style={styles.userPhoto}
        />
        <Text style={[styles.userName, isDarkMode && styles.darkText]}>Nombre de Usuario</Text>
      </View>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => toggleTheme()}
      >
        <Icon name="palette" size={24} color={isDarkMode ? 'white' : 'black'} />
        <Text style={[styles.menuItemText, isDarkMode && styles.darkText]}>Cambiar Tema</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('HomeScreen')}
      >
        <Icon name="logout" size={24} color={isDarkMode ? 'white' : 'black'} />
        <Text style={[styles.menuItemText, isDarkMode && styles.darkText]}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userPhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    fontSize: 18,
    marginTop: 10,
  },
  darkText: {
    color: '#fff',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  menuItemText: {
    fontSize: 18,
    marginLeft: 10,
  },
});
