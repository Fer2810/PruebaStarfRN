import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  DrawerLayoutAndroid,
  StatusBar,
  Dimensions,
  SafeAreaView,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SidebarMenu from './SidebarMenu';
import BottomNav from './BottomNav';

export default function WelcomeAdminScreen({ navigation }) { 
  const [isDarkMode, setIsDarkMode] = useState(false);
  const drawerRef = useRef(null);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const value = await AsyncStorage.getItem('isDarkMode');
      if (value !== null) {
        setIsDarkMode(JSON.parse(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <StatusBar style="auto" />
      <DrawerLayoutAndroid
        ref={drawerRef}
        drawerWidth={screenWidth * 0.8}
        drawerPosition="left"
        renderNavigationView={() => (
          <SidebarMenu
            isDarkMode={isDarkMode}
            toggleTheme={() => setIsDarkMode(!isDarkMode)}
            handleLogout={() => alert('Cerrar sesión')}
          />
        )}
      >
        <View style={styles.content}>
          <TouchableOpacity
            style={[styles.button, isDarkMode && styles.darkButton, { width: screenWidth * 0.8, height: screenHeight * 0.2 }]}
            onPress={() => navigation.navigate('PresentesScreen')} 
          >
            <Image
              source={require('./assets/opa.png')}
              style={styles.buttonImage}
            />
            <Text style={[styles.buttonText, isDarkMode && styles.darkButtonText]}>Estudiantes Asistidos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, isDarkMode && styles.darkButton, { width: screenWidth * 0.8, height: screenHeight * 0.2 }]}
            onPress={() => navigation.navigate('JustificacionAsistencia')} 
          >
            <Image
              source={require('./assets/opa.png')}
              style={styles.buttonImage}
            />
            <Text style={[styles.buttonText, isDarkMode && styles.darkButtonText]}>Justificación de Asistencia</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => drawerRef.current.openDrawer()}
            style={styles.menuButton}
          >
            <Icon name="menu" size={30} color={isDarkMode ? 'white' : 'black'} />
          </TouchableOpacity>
        </View>
      </DrawerLayoutAndroid>
      <BottomNav isDarkMode={isDarkMode} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  darkContainer: {
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginVertical: 50,
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
});
